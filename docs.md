# QP++ Personal Farming Documentation

Our QP++ project is centered around personalizing farming and automating hydroponics and reducing the amount of commitment required to grow plants from people.

In essence, our project is split into two parts, the platform, and the hardware

## Platform

Our platform's tech stack was Node, React, Express, and MongoDB

We also used Semantic-UI as our component library along with Chart.js for visualizers

The platform is deployed with Heroku

### Frontend

We started off with a create-react-app boilerplate, and then added navbars and other components from Semantic-UI

### Backend

We used Express and MongoDB on the backend to create an API for the hardware and frontend to access and store information.

The Arduino makes a POST request to our backend to store a plant record, detailing moisture, temperature, light etc. This is updated live on the frontend as the frontend makes a GET request to retrieve the latest data.

Additionally, our backend interacts with the hardware by giving a response back to the Arduino of whether or not to water the plants depending on the current moisture.

## Hardware