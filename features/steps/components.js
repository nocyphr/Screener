const { Given, When, Then } = require('@cucumber/cucumber');
const { By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const { getDriver } = require('./common'); // Make sure the path is correct to the common.js file

Then('I should see the title {string}', async function (string) {
    const driver = getDriver();
    const title = await driver.findElement(By.css('h1')).getText();
    assert.strictEqual(title, string);
});

Then('I should see the table component', async function () {
    const driver = getDriver();
    const table = await driver.findElement(By.css('table')); // Replace with the correct CSS selector for the table
    assert.ok(table);
});

Then('I should see the download button component', async function () {
    const driver = getDriver();
    const downloadButton = await driver.findElement(By.css('#download-button')); // Replace with the correct CSS selector for the download button
    assert.ok(downloadButton);
});

Then('I should see the {string} column', async function (column) {
    const driver = getDriver();
    const columnHeader = await driver.findElement(By.xpath(`//table//th[contains(text(), "${column}")]`));
    assert.ok(columnHeader);
});


Then('I should see the filter section component', async function () {
    const driver = getDriver();
    const filterSection = await driver.findElement(By.css('#filter-section')); // Replace with the correct CSS selector for the filter section
    assert.ok(filterSection);
});

When('I should see the applied filters in the AppliedFilters component', async function () {
    const driver = getDriver();
    const appliedFiltersSelector = '.applied-filters';
  
    // Wait for the element to become visible
    const waitForAppliedFilters = async () => {
      const isAppliedFiltersVisible = await driver.executeScript(`return !!document.querySelector('${appliedFiltersSelector}');`);
      return isAppliedFiltersVisible;
    };
    await driver.wait(waitForAppliedFilters, 5000);
  
    // Check if the filters are displayed
    const appliedFilters = await driver.findElements(By.css(appliedFiltersSelector));
    assert.ok(appliedFilters.length > 0, 'Applied filters not found in the AppliedFilters component');
  });
  
  