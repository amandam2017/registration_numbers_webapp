# registration_numbers_webapp

In this web page, you will be able to add and display added registration numbers on the browser. You will  be able to store added registration numbers on the database.

I have used a postgreSQL database to store the data - in this case I am using two tables. 
Table 1 - to store town names and their town license mark (CA, CK, CL).
Table 2 - to store the added registration numbers.

I have to use a foreign key to link both tables - this constraint is used on this project to make a relationship between the two tables using the towns_id so that we can be able to get the value of the checked town (which is the license mark).

The towns_id is also used to filter the registration numbers of the checked town - so when radio button is checked you will get the registration number/s of a checked town using towns_id which will be either 1 or 2 or 3.

This webpage is deployed on heroku: https://reg-webapp-ma.herokuapp.com/
