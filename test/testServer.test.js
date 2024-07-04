import chrome from "selenium-webdriver/chrome.js";
import { Builder } from "selenium-webdriver";

let serverPort;
let driver;

export async function mochaGlobalTeardown() {
  console.log("Cleaning up server");
  if (driver) {
    driver.quit(); // Close WebDriver session
  }

  // await server.kill('SIGTERM');

  console.log("clean up done");
}

export async function mochaGlobalSetup() {
  serverPort = 8081;
}

export async function init() {
  let options = new chrome.Options();
  options.addArguments('--headless', '--disable-gpu', '--no-sandbox');
  driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  return { driver: driver, serverPort: serverPort }
}

export async function initAfter() {
  await driver.quit();
  console.log("browser closed");
}
