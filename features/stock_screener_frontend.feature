Feature: Stock Screener Website

As a user, I want to be able to view, filter, sort, and download stock data in a user-friendly interface.

Background:
Given I am on the Stock Management React App

Scenario: Display the title of the Stock Management React App
Then I should see the title "Nocyphr Stock Screener"

Scenario: Filter stock data
Given I see the filter section
When I input a filter criteria in the filter section
Then I should see the table of stocks update with the filtered results

Scenario: Sort stock data
Given I see the table of stocks
When I click on a column header
Then I should see the table of stocks sorted by the selected column in ascending order
When I click on the same column header again
Then I should see the table of stocks sorted by the selected column in descending order

Scenario: Download stock data as a CSV file
Given I see the "Download as CSV" button
When I click the "Download as CSV" button
Then I should download the current state of the displayed dataset as a CSV file