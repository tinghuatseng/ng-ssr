Feature: Header Component

Background:
  Header component is a crucial part of the web application, providing navigation and branding, and show user information if logged in.

Scenario: Displaying the header
  Given I navigate to any page of the application
  Then I should see the header component with the logo and navigation links
  And the header should be visible at the top of the page
  And the header should have a background color of #ffffff
  And the header text should have a color of #000000
  And the header should have a height of 60px
  And the header should have a box shadow effect
  And the header should be responsive to different screen sizes
  And the header should include the following elements
  Examples:
    | Element         |
    | Logo            |
    | Navigation links|
    | User avatar     |

Scenario: Responsive header behavior
  Given I resize the browser window to a mobile width
  Then the header should collapse into a hamburger menu

Scenario: User logged in
  Given I am logged into the application
  When I view the header
  Then I should see my avatar displayed in the header

Scenario: User not logged in
  Given I am not logged into the application
  When I view the header
  Then I should see a login button in the header

Scenario: Navigation links functionality
  Given I am on the home page
  When I click on the link in the header
  Then I should be navigated to the page
  And links as follows Examples
  Examples:
    | link text| link url|
    | About Us      | about    |
    | Login         | login    |
    | User avatar      | profile |
    | Food Search | food-search |

Scenario: Header Scrolling Behavior
  Given I am on a page with scrollable content
  When I scroll down the page
  Then the header should remain fixed at the top of the viewport
  When I scroll back to the top of the page
  Then the header should remain fixed at the top of the viewport
