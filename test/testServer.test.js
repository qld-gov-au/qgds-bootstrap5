/* global process */
import {exec} from 'child_process';
import portfinder from 'portfinder';
import chrome from "selenium-webdriver/chrome.js";
import {Builder} from "selenium-webdriver";

let serverPort;
let server;
let driver;

export async function mochaGlobalTeardown() {
        console.log("Cleaning up server");
        if (driver) {
            driver.quit(); // Close WebDriver session
        }

        await server.kill('SIGTERM');

        console.log("clean up done");
}

export async function mochaGlobalSetup() {
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
}

export async function init() {

    let options = new chrome.Options();
    options.addArguments('--headless', '--disable-gpu', '--no-sandbox');
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    return {driver: driver, serverPort: serverPort}
}
export async function initAfter() {
    await driver.quit();
    console.log("browser closed");
}