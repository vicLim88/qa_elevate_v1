Feature:Cart Functionality - SampleApp Web Platform

    Scenario: User is able to add products to cart
        Given The user navigates to a product details page in SampleApp
        When The user clicks on the 'Add to cart' button
        Then The selected product should be added to the user's cart
        And The cart should display an updated total count of items and price

    Scenario: User is able to remove products from cart
        Given The user navigates to their cart in SampleApp
        When The user clicks on the 'Remove' button next to a product
        Then The selected product should be removed from the user's cart
        And The cart should display an updated total count of items and price