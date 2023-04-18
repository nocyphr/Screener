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