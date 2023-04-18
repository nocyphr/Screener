const { Given, When, Then } = require('@cucumber/cucumber');
const { By, Key } = require('selenium-webdriver');
const assert = require('assert');
const { getDriver } = require('./common');

Given('I see the filter section', async function () {
  this.driver = getDriver();
  this.filterSection = await this.driver.findElement(By.css('#filter-section input'));
});

When(/^I apply a (.*) criteria to the (.*)$/, async function (filter, column) {
  this.column = column;
  this.filter = filter;
  this.filterSection = await this.driver.findElement(By.css('#filter-section input'));
  await this.filterSection.clear();
  await this.filterSection.sendKeys(filter, Key.RETURN);
});

async function getColumnIndex(driver, columnName) {
  const headers = await driver.findElements(By.css('table thead tr th'));
  for (let i = 0; i < headers.length; i++) {
    const headerText = await headers[i].getText();
    if (headerText === columnName) {
      return i;
    }
  }

  // Return -1 if the column is not found
  return -1;
}


const evaluateFilterExpression = (value, filter) => {
  const trimmedFilter = filter.trim();
  const filterType = trimmedFilter[0];
  const filterValue = trimmedFilter.slice(1).trim();

  if (filterType === '<') {
    const cellValueAsNumber = parseFloat(value.replace(/\s+/g, ''));
    const filterValueAsNumber = parseFloat(filterValue);
    return cellValueAsNumber < filterValueAsNumber;
  }

  if (filterType === '>') {
    const cellValueAsNumber = parseFloat(value.replace(/\s+/g, ''));
    const filterValueAsNumber = parseFloat(filterValue);
    return cellValueAsNumber > filterValueAsNumber;
  }

  if (filterType === '!') {
    // Check if value does not include the filter value
    return !value.toLowerCase().includes(filterValue.toLowerCase());
  }

  // Handle the case when there is no operator in the filter expression
  return value.toLowerCase().includes(trimmedFilter.toLowerCase());
};


Then(/^(\w+) should no longer contain entries where (.*) is false$/, async function (column, filter) {
  this.column = column;
  const rows = await this.driver.findElements(By.css('table tbody tr'));
  const columnIndex = await getColumnIndex(this.driver, this.column);

  if (columnIndex === -1) {
    throw new Error(`Column "${this.column}" not found`);
  }

  for (let i = 0; i < rows.length; i++) {
    const cells = await rows[i].findElements(By.css('td'));
    const cellText = await cells[columnIndex].getText();

    const filterResult = evaluateFilterExpression(cellText, filter);

    assert.ok(filterResult, `Row ${i + 1} does not satisfy the filter criteria "${filter}" for column "${this.column}"`);
  }
});



Given('I see the table of stocks', async function () {
  this.driver = getDriver();
  const table = await this.driver.findElement(By.css('table'));
});

When(/^I click on (.*) with (.*?) order$/, async function (columnName, sortOrder) {
  this.columnName = columnName
  this.headerElement = await this.driver.findElement(By.xpath(`//table//thead//tr//th[contains(text(), "${columnName}")]`));
  await this.headerElement.click();
});

const isSorted = (a, b, order) => {
  if (order === 'ascending') {
    return a <= b;
  }
  if (order === 'descending') {
    return a >= b;
  }
};

Then(/^I should see the table of stocks sorted by the selected column in (.*?) order$/, async function (expectedOrder) {
  const columnIndex = await this.headerElement.getAttribute('cellIndex');
  const rows = await this.driver.findElements(By.css('table tbody tr'));
  let previousValue = null;

  for (let i = 0; i < rows.length; i++) {
    const cells = await rows[i].findElements(By.css('td'));
    const cellText = await cells[columnIndex].getText();
    const currentValue = cellText;

    if (previousValue !== null) {
      assert.ok(isSorted(previousValue, currentValue, expectedOrder), `Row ${i + 1} is not sorted in ${expectedOrder} order`);
    }

    previousValue = currentValue;
  }
});

Given('I see the {string} button', async function (string) {
  const driver = getDriver();
  this.downloadButton = await driver.findElement(By.css('#download-button'));
});

When('I click the {string} button', async function (string) {
  await this.downloadButton.click();
});

Then('the dataset is downloaded in csv-format', function () {
  // Manual testing required
});
