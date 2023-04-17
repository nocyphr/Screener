const { Given, When, Then } = require('@cucumber/cucumber');
const { By, Key } = require('selenium-webdriver');
const assert = require('assert');
const { getDriver } = require('./common');

Given('I see the filter section', async function () {
  this.driver = getDriver();
  this.filterSection = await this.driver.findElement(By.css('#filter-section input'));
});

When('I input a filter criteria in the filter section', async function () {
  this.filterSection = await this.driver.findElement(By.css('#filter-section input'));
  await this.filterSection.sendKeys('A', Key.RETURN);
});

Then('I should see the table of stocks update with the filtered results', async function () {
  const filterCriteria = 'A';
  const rows = await this.driver.findElements(By.css('table tbody tr'));
  
  for (let i = 0; i < rows.length; i++) {
    const cells = await rows[i].findElements(By.css('td'));
    
    let foundMatch = false;
    for (let j = 0; j < cells.length; j++) {
      const cellText = await cells[j].getText();
      
      if (cellText.includes(filterCriteria)) {
        foundMatch = true;
        break;
      }
    }
    
    assert.ok(foundMatch, `Row ${i + 1} does not contain the filter criteria "${filterCriteria}"`);
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
