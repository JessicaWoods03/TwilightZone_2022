# Getting Started with The backend app

# Starting the backend app
To start the app: 
In the command terminal:
- navigate to the backend folder: cd /TwilightZoneApp/twilightzoneapp/backend
- run the command: npm start


# Routing and setup
The main entry point to the backend part of the application is in the server.js file.
It includes the main controller functionality through the get and post methods, and it is where most all services will work to process api transactions.

The service paths used in the get, post, put, and delete methods are defined as the first argument
in the method, with the function the method uses as the second argument.


# Testing the app 
In the current state, everything that is included in the routing in the server.js can be called 
using the basepath with its corresponding service path.

Basepath: http://localhost:5000
Test ghost service path w/ query params: ghostReports?city=Ada&state=Michigan

The above get call returns a report where city matches provided and state matches what's provided.

You can use many tools to test APIs but I recommend using Postman as it has an intuative easy to use UI and it is very simple to download and setup. 

Postman Download: https://www.postman.com/downloads/

Once you have it downloaded and set it up you can test anything you add to the server.js file.