Feature: Food Search

  As a user
  I want to search for food ingredients
  So that I can find nutritional, producer information about them

Background:
  Given the food data API is mocked

Scenario: initial food search page
  When navigate to food search page
  Then display food search input box
  And no api request is made to fetch food ingredient data

Scenario: loading food search results
  When user enters a search term
  And submits the search
  Then display loading indicator
  And fetch food ingredient data from API
  And filter results based on search term
  And display filtered food ingredient results

Scenario: after first search
  Given food api response
  When user enters a new search term
  And submits the search
  Then use cached food ingredient data
  And filter results based on new search term
  And display filtered food ingredient results
