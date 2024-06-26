import {By, until} from 'selenium-webdriver';
import {assert} from 'chai';
import {describe, before, after, it} from 'mocha';
import {init, initAfter} from './testServer.test.js';

describe('DOM Content Test with Selenium', function () {
  let driver;
  let serverPort;

  before(async function () {
    // Find an available port dynamically
    let data = await init();
    serverPort = data.serverPort;
    driver = data.driver;
    await new Promise(resolve => setTimeout(resolve, 500))
  });

  after( async function () {
    await initAfter();
  })


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
