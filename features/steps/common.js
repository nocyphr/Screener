const { BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { Builder, By, Key, until } = require('selenium-webdriver');

let driver;

BeforeAll(async function () {
  driver = await new Builder()
    .forBrowser('chrome')
    .usingServer('http://selenium:4444/wd/hub')
    .build();

  await driver.get(`http://${process.env.HOSTMACHINEIP}:3000`);
});

AfterAll(async function () {
  if (driver) {
    await driver.quit();
  }
});

const getDriver = () => {
    return driver;
  };


module.exports = {
  driver, getDriver
};
