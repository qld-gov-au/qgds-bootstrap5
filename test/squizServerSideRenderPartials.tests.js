import {By, until} from 'selenium-webdriver';
import { expect } from 'chai';
import {describe, before, after, it } from 'mocha';
import { init, initAfter } from './testServer.test.js';

describe('DOM Content Test with Selenium on Full Page Partials', function () {
  let driver;
  let serverPort;

  before(async function () {
    // Find an available port dynamically
    let data = await init();
    serverPort = data.serverPort;
    driver = data.driver;

    await driver.get(`http://localhost:${serverPort}/test/squizExamplePartials.html`);
    await driver.wait(until.elementLocated(By.css('.footer-content')), 10000);
    await new Promise(resolve => setTimeout(resolve, 500))
  });

  after( async function () {
    await initAfter()
  })

  it('should have skip links', async () => {
    const skipLinks = await driver.findElements(By.css('.qld__header__skip-link__linkstyle'));
    expect(skipLinks).to.have.lengthOf(2);

    const mainContentLink = await driver.findElement(By.css('.qld__header__skip-link__linkstyle[href="#content"]'));
    const mainNavLink = await driver.findElement(By.css('.qld__header__skip-link__linkstyle[href="#main-nav"]'));

    expect(await mainContentLink.isDisplayed()).to.be.true;
    expect(await mainNavLink.isDisplayed()).to.be.true;
  });

  // unsure why it does not like headless
  // it('should have correct pre-header URL', async () => {
  //   await new Promise(resolve => setTimeout(resolve, 500))
  //   const preHeaderUrl = await driver.findElement(By.css('.qld__header__pre-header-url'));
  //   expect(await preHeaderUrl.getText()).to.equal('www.qld.gov.au');
  // });

  it('should find the nav-title link', async function() {
    const navTitleLink = await driver.findElement(By.css('.nav-title .nav-link'));
    const linkText = await navTitleLink.getText();
    expect(linkText).to.equal('In this section');
  });

  it('should find all level one nav-items', async function() {
    const navItems = await driver.findElements(By.css('.qld-side-navigation > ul > .nav-item'));
    expect(navItems).to.have.lengthOf(8);
  });

  it('should find an active level two nav-item', async function() {
    const activeLevelTwoItem = await driver.findElement(By.css('.nav > .nav-item > ul > .nav-item.active .nav-link'));
    const linkText = await activeLevelTwoItem.getText();
    expect(linkText).to.equal('Level two item');
  });

  it('should find an active level three nav-item', async function() {
    const activeLevelThreeItem = await driver.findElement(By.css('.nav > .nav-item > ul > .nav-item > ul > .nav-item.active .nav-link'));
    const linkText = await activeLevelThreeItem.getText();
    expect(linkText).to.equal('Level three item that wraps to another line');
  });

  it('should find the last updated date', async function() {
    const lastUpdated = await driver.findElement(By.css('.qld-content-dates dd')).getText();
    expect(lastUpdated).to.equal('10 December 1987');
  });

  it('should find the footer site name', async function() {
    const siteName = await driver.findElement(By.css('.footer-site-name')).getText();
    expect(siteName).to.equal('Site name, Namestyle or Name Identifier');
  });

  it('should find the contact us phone number', async function() {
    const phone = await driver.findElement(By.css('.footer-contact-item .icon-phone')).findElement(By.xpath('..')).getText();
    expect(phone).to.include('13 QGOV (13 74 68)');
  });

  it('should find the contact us email', async function() {
    const email = await driver.findElement(By.css('.footer-contact-item .icon-email')).findElement(By.xpath('..')).getText();
    expect(email).to.include('email@qld.gov.au');
  });

  it('should find the footer navigation links', async function() {
    const links = await driver.findElements(By.css('.footer-link-list .nav-link'));
    const linkTexts = await Promise.all(links.map(link => link.getText()));
    expect(linkTexts).to.include.members([
      'Help',
      'Copyright',
      'Disclaimer',
      'Privacy',
      'Right to information',
      'Accessibility',
      'Jobs in Queensland\nGovernment',
      'Other languages',
      'Facebook',
      'LinkedIn',
      'X (Twitter)',
      'Youtube',
      'Instagram',
    ]);
  });

  it('should find the acknowledgement text', async function() {
    const acknowledgement = await driver.findElement(By.css('.footer-acknowledgements p')).getText();
    expect(acknowledgement).to.include('We pay our respects to the Aboriginal and Torres Strait Islander ancestors of this land');
  });

  it('should find the copyright text', async function() {
    const copyright = await driver.findElement(By.css('.copyright')).getText();
    expect(copyright).to.equal('© The State of Queensland (Organisation) 2024');
  });

  it('should find the Queensland Government link', async function() {
    const qldGovLink = await driver.findElement(By.css('.fw-semibold')).getAttribute('href');
    expect(qldGovLink).to.equal('https://www.qld.gov.au/');
  });
});
