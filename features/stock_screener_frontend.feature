Feature: Stock Screener Website

As a user, I want to be able to view, filter, sort, and download stock data in a user-friendly interface.


Scenario: Filter stock data
Given I see the filter section
When I input a filter criteria in the filter section
Then I should see the table of stocks update with the filtered results

Scenario Outline: Sort stock data
Given I see the table of stocks
When I click on a column with <current_sorting> order
Then I should see the table of stocks sorted by the selected column in <new_sorting> order

Examples: 
| current_sorting | new_sorting | 
| unsorted        | ascending   |
| ascending       | descending  |
| descending      | ascending   |

Scenario: Download stock data as a CSV file
Given I see the "Download as CSV" button
When I click the "Download as CSV" button
Then the dataset is downloaded in csv-format