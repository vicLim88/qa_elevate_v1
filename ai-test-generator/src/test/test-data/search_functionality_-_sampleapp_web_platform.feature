Feature:Search Functionality - SampleApp Web Platform

    Scenario: User is able to search for products
        Given The user navigates to the homepage of SampleApp
        When The user enters a valid product name in the search bar and submits it
        Then The system should return search results containing the entered product name
        And The returned results should be clickable, taking the user to the product details page