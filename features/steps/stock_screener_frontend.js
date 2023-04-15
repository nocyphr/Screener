const { Given, When, Then, AfterAll } = require('@cucumber/cucumber');
const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

let driver;

Given('I am on the Stock Management React App', async function () {
  driver = await new Builder()
    .forBrowser('chrome')
    .usingServer('http://selenium:4444/wd/hub')
    .build();

  await driver.get(`http://${process.env.HOSTMACHINEIP}:3000`);
});

Then('I should see the title {string}', async function (string) {
  const title = await driver.findElement(By.css('h1')).getText();
  assert.strictEqual(title, string);
});

AfterAll(async function () {
  if (driver) {
    await driver.quit();
  }
});




Given('I see the filter section', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('I input a filter criteria in the filter section', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('I should see the table of stocks update with the filtered results', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Given('I see the table of stocks', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When(/^I click on a column with (.*?) order$/, function (current_sorting) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then(/^I should see the table of stocks sorted by the selected column in (.*?) order$/, function (new_sorting) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Given('I see the {string} button', function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('I click the {string} button', function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('I receive the current state of the displayed dataset in csv-format', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});
