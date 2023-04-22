const { Given, When, Then } = require('@cucumber/cucumber');
const { By, Key } = require('selenium-webdriver');
const assert = require('assert');
const { getDriver } = require('./common');

Given('I see the filter section', async function () {
  this.driver = getDriver();
  this.filterSection = await this.driver.findElement(By.css('#filter-section input'));
});

When(/^I apply a (.*) criteria to the (.*)$/, async function (filter, column) {
  if (!this.filter1) {
    this.column1 = column;
    this.filter1 = filter;
  } else {
    this.column2 = column;
    this.filter2 = filter;
  }

  const filterInput = await this.driver.findElement(By.css('#filter-section input'));
  await filterInput.clear();
  await filterInput.sendKeys(filter, Key.RETURN);
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
// Then('{string} should no longer contain entries where {string} is false', async function (column, filter) {
    const column1 = this.column1 || column;
    const filter1 = this.filter1 || filter;
    const column2 = this.column2;
    const filter2 = this.filter2;
  
    const driver = getDriver();
  
    const columnHeader1 = await driver.findElement(By.xpath(`//table//th[contains(text(), "${column1}")]`));
    const columnHeaderIndex1 = await columnHeader1.getAttribute('cellIndex');
  
    if (column2 && filter2) {
      const columnHeader2 = await driver.findElement(By.xpath(`//table//th[contains(text(), "${column2}")]`));
      const columnHeaderIndex2 = await columnHeader2.getAttribute('cellIndex');
  
      const rows = await driver.findElements(By.css('table tbody tr'));
  
      for (const row of rows) {
        const cell1 = await row.findElement(By.xpath(`td[${columnHeaderIndex1 + 1}]`));
        const cell2 = await row.findElement(By.xpath(`td[${columnHeaderIndex2 + 1}]`));
        const cellValue1 = await cell1.getText();
        const cellValue2 = await cell2.getText();
  
        assert.ok(
          evaluateFilterExpression(cellValue1, filter1) && evaluateFilterExpression(cellValue2, filter2),
          `Row contains entry where filter "${filter1}" is false for column "${column1}" or filter "${filter2}" is false for column "${column2}".`
        );
      }
    } else {
      const rows = await driver.findElements(By.css('table tbody tr'));
  
      for (const row of rows) {
        const cell = await row.findElement(By.xpath(`td[${columnHeaderIndex1 + 1}]`));
        const cellValue = await cell.getText();
  
        assert.ok(
          evaluateFilterExpression(cellValue, filter1),
          `Row contains entry where filter "${filter1}" is false for column "${column1}".`
        );
      }
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

Then('the table view should show only the data that satisfies both filters', async function () {
  const rows = await this.driver.findElements(By.css('table tbody tr'));
  const columnIndex1 = await getColumnIndex(this.driver, this.column1);
  const columnIndex2 = await getColumnIndex(this.driver, this.column2);

  for (let i = 0; i < rows.length; i++) {
    const cells = await rows[i].findElements(By.css('td'));
    const cellText1 = await cells[columnIndex1].getText();
    const cellText2 = await cells[columnIndex2].getText();

    const filterResult1 = evaluateFilterExpression(cellText1, this.filter1);
    const filterResult2 = evaluateFilterExpression(cellText2, this.filter2);

    assert.ok(filterResult1 && filterResult2, `Row ${i + 1} does not satisfy both filter criteria "${this.filter1}" for column "${this.column1}" and "${this.filter2}" for column "${this.column2}"`);
  }
});

Then('the AppliedFilters component should display the filters applied', async function () {
  const appliedFilters = await this.driver.findElement(By.css('.applied-filters'));
  const appliedFilterText = await appliedFilters.getText();

  assert.ok(appliedFilterText.includes(this.column1), `AppliedFilters does not display the first filter column "${this.column1}"`);
  assert.ok(appliedFilterText.includes(this.filter1), `AppliedFilters does not display the first filter criteria "${this.filter1}"`);
  assert.ok(appliedFilterText.includes(this.column2), `AppliedFilters does not display the second filter column "${this.column2}"`);
  assert.ok(appliedFilterText.includes(this.filter2), `AppliedFilters does not display the second filter criteria "${this.filter2}"`);
});
