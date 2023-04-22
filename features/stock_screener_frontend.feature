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
  
###################################################################################
###################################################################################
###################################################################################

Scenario: Clear all applied filters
    Given I see the filter section
    And I apply a A criteria to the Symbol
    And I apply a >160 criteria to the Price
    And I see the applied filters in the AppliedFilters component
    When I click the Clear All Filters button
    Then no filters should be applied
    And the AppliedFilters component should be empty

Scenario: Remove a single filter
    Given I see the filter section
    And I apply a A criteria to the Symbol
    And I apply a >160 criteria to the Price
    And I see the applied filters in the AppliedFilters component
    When I remove the A criteria from the Symbol
    Then the Symbol filter should be removed
    And the Price filter should remain applied


Scenario: Applied filter persists after page reload
    Given I see the filter section
    And I apply a A criteria to the Symbol
    And I see the applied filters in the AppliedFilters component
    When I reload the page
    Then the Symbol filter should remain applied
    And I should see the applied filters in the AppliedFilters component

Scenario: Column sorting persists after page reload
    Given I see the stock data table
    And I sort the Price column
    When I reload the page
    Then the Price column should remain sorted
