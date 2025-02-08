Feature:Checkout Functionality - SampleApp Web Platform

    Scenario: User is able to proceed to checkout
        Given The user has added at least one item to their cart in SampleApp
        When The user clicks on the 'Proceed to checkout' button
        Then The user should be taken to the checkout page
        And The checkout page should display the items in the cart and their prices
        And The user should be able to enter their shipping and billing details
        And The user should have an option to review their order before submitting it
        And After submitting the order, the user should receive a confirmation message or email