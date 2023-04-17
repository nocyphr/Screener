const { Given, When, Then } = require('@cucumber/cucumber');
const { By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const { getDriver } = require('./common');

Given('I see the filter section', async function () {
  const driver = getDriver();
  const filterSection = await driver.findElement(By.css('#filter-section'));
  assert.ok(filterSection);
  // clean up: no assert here please, use context to pass on the FilterSection and continue in WHEN block
});

// this needs to be refined in the Feature file -> Outline with examples column | filter -> test text column, numerical column, operators
When('I input a filter criteria in the filter section', async function () {
  const driver = getDriver();
  const filterInput = await driver.findElement(By.css('#filter-section input'));
  await filterInput.sendKeys('A', Key.RETURN);
});

Then('I should see the table of stocks update with the filtered results', async function () {
  // e.g. Test that there are no results not containing "A"
});

Given('I see the table of stocks', async function () {
  const driver = getDriver();
  const table = await driver.findElement(By.css('table'));
  assert.ok(table);
});

When(/^I click on a column with (.*?) order$/, async function (current_sorting) {
  const driver = getDriver();
  const columnHeader = await driver.findElement(By.xpath(`//table//thead//tr//th[contains(text(), "${current_sorting}")]`));
  await columnHeader.click();
});

Then(/^I should see the table of stocks sorted by the selected column in (.*?) order$/, async function (new_sorting) {
  // Implement the verification of the sorted table
});

Given('I see the {string} button', async function (string) {
  const driver = getDriver();
  const downloadButton = await driver.findElement(By.css('#download-button'));
  // clean up: no assert in given, use context to pass on to WHEN block
  assert.ok(downloadButton);
});

When('I click the {string} button', async function (string) {
  const driver = getDriver();
  const downloadButton = await driver.findElement(By.css('#download-button'));
  await downloadButton.click();
});

Then('the dataset is downloaded in csv-format', function () {
  // Manual testing?
});
