import {Builder, By, until} from 'selenium-webdriver';
import { expect } from 'chai';
import {exec} from 'child_process';
import portfinder from 'portfinder';
import {describe, before, after, it } from 'mocha';


describe('DOM Content Test with Selenium on Full Page Partials', function () {
  let driver;
  let server;
  let serverPort;

  before(async function () {
    // Find an available port dynamically
    serverPort = await portfinder.getPortPromise();

    // Start live-server to serve the current working directory
    server = await exec(`npx live-server --no-browser --port=${serverPort}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`live-server error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`live-server stderr: ${stderr}`);
        return;
      }
      console.log(`live-server stdout:\n${stdout}`);
    });

    // Initialize Selenium WebDriver (here using Chrome)
    driver = await new Builder().forBrowser('chrome').build();
    // Load the page
    await driver.get(`http://localhost:${serverPort}/test/squizExamplePartials.html`);
    await driver.wait(until.elementLocated(By.css('.footer-content')), 10000);
  });

  after(async function () {
    if (driver) {
      await driver.quit(); // Close WebDriver session
    }
    if (server) {
      await server.kill('SIGINT'); // Stop live-server
    }
  });

  it('should have skip links', async () => {
    const skipLinks = await driver.findElements(By.css('.qld__header__skip-link__linkstyle'));
    expect(skipLinks).to.have.lengthOf(2);

    const mainContentLink = await driver.findElement(By.css('.qld__header__skip-link__linkstyle[href="#content"]'));
    const mainNavLink = await driver.findElement(By.css('.qld__header__skip-link__linkstyle[href="#main-nav"]'));

    expect(await mainContentLink.isDisplayed()).to.be.true;
    expect(await mainNavLink.isDisplayed()).to.be.true;
  });

  it('should have correct pre-header URL', async () => {
    const preHeaderUrl = await driver.findElement(By.css('.qld__header__pre-header-url'));
    expect(await preHeaderUrl.getText()).to.equal('www.qld.gov.au');
  });

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
