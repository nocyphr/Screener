Feature: Stock Screener Website

As a user, I want to be able to view, filter, sort, and download stock data in a user-friendly interface.


Scenario Outline: Filter stock data
Given I see the filter section
When I apply a <Filter> criteria to the <Column>
Then <Column> should no longer contain entries where <Filter> is false

Examples: 
| Column    | Filter     |
| Symbol    | A          | 
| Price     | >160       |
| Symbol    | !E         |
| MarketCap | <450000000 |

Scenario Outline: Sort stock data
Given I see the table of stocks
When I click on <column> with <current_sorting> order
Then I should see the table of stocks sorted by the selected column in <new_sorting> order

Examples: 
| column | current_sorting | new_sorting | 
| Symbol | unsorted        | ascending   |
| Symbol | ascending       | descending  |
| Symbol | descending      | ascending   |

Scenario: Download stock data as a CSV file
Given I see the "Download as CSV" button
When I click the "Download as CSV" button
Then the dataset is downloaded in csv-format

Scenario Outline: Filter stock data with multiple filters
  Given I see the filter section
  When I apply a <Filter1> criteria to the <Column1>
  And I apply a <Filter2> criteria to the <Column2>
  Then <Column1> should no longer contain entries where <Filter1> is false
  And <Column2> should no longer contain entries where <Filter2> is false
  And I should see the applied filters in the AppliedFilters component

  Examples:
  | Column1 | Filter1 | Column2    | Filter2    |
  | Symbol  | A       | Price      | >160       |
  | Symbol  | !E      | MarketCap  | <450000000 |
