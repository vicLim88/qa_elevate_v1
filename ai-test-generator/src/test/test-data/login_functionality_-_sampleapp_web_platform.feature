Feature: Login Functionality - SampleApp Web Platform

    Scenario: User is able to login successfully
        Given The user navigates to the login page of SampleApp
        When The user enters valid credentials and submits the form
        Then The system should validate the entered credentials and grant access
        And The user should be redirected to the homepage or dashboard