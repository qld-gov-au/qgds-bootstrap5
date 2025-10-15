import { By, until } from 'selenium-webdriver';
import { expect } from 'chai';
import { describe, before, after, it } from 'mocha';
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
    await new Promise(resolve => setTimeout(resolve, 500))

    try {
      await driver.wait(until.elementLocated(By.css('.footer-content')), 10000);
    } catch (e) {
      console.log(`error waiting, moving on, error was: ${e}`)
    }

    await new Promise(resolve => setTimeout(resolve, 500))

  });

  after( async function () {
    await initAfter()
  })

  it('should find the last updated date', async function() {
    const lastUpdated = await driver.findElement(By.css('.qld-content-dates dd')).getText();
    expect(lastUpdated).to.equal('10 December 1987');
  });

  it('should find the contact us phone number', async function() {
    const phone = await driver.findElement(By.css('.footer-contact-item .qld-icon-phone')).findElement(By.xpath('..')).getText();
    expect(phone).to.include('13 QGOV (13 74 68)');
  });

  it('should find the contact us email', async function() {
    const email = await driver.findElement(By.css('.footer-contact-item .qld-icon-email')).findElement(By.xpath('..')).getText();
    expect(email).to.include('email@qld.gov.au');
  });

  //Disabled for now
  // it('should find the footer navigation links', async function() {
  //   const links = await driver.findElements(By.css('.footer-link-list .nav-link'));
  //   const linkTexts = await Promise.all(links.map(link => link.getText()));
  //   expect(linkTexts).to.include.members([
  //     'Help',
  //     'Copyright',
  //     'Disclaimer',
  //     'Privacy',
  //     'Right to information',
  //     'Accessibility',
  //     'Jobs in Queensland\nGovernment',
  //     'Other languages',
  //     'Facebook',
  //     'LinkedIn',
  //     'X (Twitter)',
  //     'Youtube',
  //     'Instagram',
  //   ]);
  // });

  it('should find the acknowledgement text', async function() {
    const acknowledgement = await driver.findElement(By.css('.footer-acknowledgements p')).getText();
    expect(acknowledgement).to.include('We pay our respects to the Aboriginal and Torres Strait Islander ancestors of this land');
  });

  it('should find the copyright text', async function() {
    const copyright = await driver.findElement(By.css('.copyright')).getText();
    expect(copyright).to.contain('© The State of Queensland');
  });
});
