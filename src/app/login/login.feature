Feature: Login

Scenario: Login page accessibility
    Given the user navigates to the login page
    Then the login page should be displayed
    And Input fields for username and password should be present
    And a login button should be present
    And fields should be empty by default
    And fields labels should be displayed as below:
      | Field    | Label     |
      | Username | 帳號  |
      | Password | 密碼  |

Scenario: Successful login with valid credentials
    Given the user is on the login page
    When the user enters a valid username and password
    And the user clicks the login button
    Then the user should be redirected to the profile page
    And a profile page should be displayed
    And header should display user avatar and username
    And user avatar should be displayed as below:
      | Element     | Value   |
      | Avatar URL  | cat.png |
    And User data should be memorized in service
