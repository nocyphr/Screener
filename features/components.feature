Feature: Stock Screener Components

  As a user, I want to ensure that the necessary components of the Stock Screener are present on the page.

Scenario: Verify the title of the Stock Screener
Then I should see the title "Nocyphr Stock Screener"

  Scenario: Verify that the table exists
    Then I should see the table component

  Scenario: Verify that the download button exists
    Then I should see the download button component

    Scenario Outline: Verify that the columns exist
    Then I should see the "<column>" column

    Examples:
        | column    |
        | Symbol    |
        | Price     |
        | MarketCap |


  Scenario: Verify that the filter section exists
    Then I should see the filter section component
