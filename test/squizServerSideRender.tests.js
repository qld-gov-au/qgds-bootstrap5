import {Builder, By, until} from 'selenium-webdriver';
import {assert} from 'chai';
import {exec} from 'child_process';
import portfinder from 'portfinder';
import {describe, before, after, it} from 'mocha';

describe('DOM Content Test with Selenium', function () {
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

  });

  after(async function () {
    if (driver) {
      await driver.quit(); // Close WebDriver session
    }
    if (server) {
      await server.kill('SIGINT'); // Stop live-server
    }
  });

  it('Should verify content after DOM load via handlebars.partials.js only', async function () {

    // Load the page
    await driver.get(`http://localhost:${serverPort}/test/squizExample.html`);

    // Wait for the .accordion-group element to be present
    await driver.wait(until.elementLocated(By.css('.accordion-group')), 10000);

    // Wait for the .accordion-group element to be present
    await driver.wait(until.elementLocated(By.css('.accordion-group')), 10000);

    // Check if the accordion group is present
    const accordionGroup = await driver.findElement(By.css('.accordion-group'));
    assert.isNotNull(accordionGroup);

    // Check if the accordion items are present
    const accordionItems = await driver.findElements(By.css('.accordion-item'));
    assert.lengthOf(accordionItems, 3);

    // Verify the first accordion item is expanded
    const firstAccordionButton = await driver.findElement(By.css('#heading-One .accordion-button'));
    const isExpanded = await firstAccordionButton.getAttribute('aria-expanded');
    assert.equal(isExpanded, 'true');

    // Verify the second and third accordion items are collapsed
    const secondAccordionButton = await driver.findElement(By.css('#heading-Two .accordion-button'));
    const secondIsExpanded = await secondAccordionButton.getAttribute('aria-expanded');
    assert.equal(secondIsExpanded, 'false');

    const thirdAccordionButton = await driver.findElement(By.css('#heading-Three .accordion-button'));
    const thirdIsExpanded = await thirdAccordionButton.getAttribute('aria-expanded');
    assert.equal(thirdIsExpanded, 'false');

  });



  it('Should verify content after DOM load via handlebars.partials.js only', async function () {

    // Load the page
    await driver.get(`http://localhost:${serverPort}/test/squizExampleInit.html`);

    // Wait for the .accordion-group element to be present
    await driver.wait(until.elementLocated(By.css('.accordion-group')), 10000);

    // Wait for the .accordion-group element to be present
    await driver.wait(until.elementLocated(By.css('.accordion-group')), 10000);

    // Check if the accordion group is present
    const accordionGroup = await driver.findElement(By.css('.accordion-group'));
    assert.isNotNull(accordionGroup);

    // Check if the accordion items are present
    const accordionItems = await driver.findElements(By.css('.accordion-item'));
    assert.lengthOf(accordionItems, 3);

    // Verify the first accordion item is expanded
    const firstAccordionButton = await driver.findElement(By.css('#heading-One .accordion-button'));
    const isExpanded = await firstAccordionButton.getAttribute('aria-expanded');
    assert.equal(isExpanded, 'true');

    // Verify the second and third accordion items are collapsed
    const secondAccordionButton = await driver.findElement(By.css('#heading-Two .accordion-button'));
    const secondIsExpanded = await secondAccordionButton.getAttribute('aria-expanded');
    assert.equal(secondIsExpanded, 'false');

    const thirdAccordionButton = await driver.findElement(By.css('#heading-Three .accordion-button'));
    const thirdIsExpanded = await thirdAccordionButton.getAttribute('aria-expanded');
    assert.equal(thirdIsExpanded, 'false');

  });
});
