# PersonalFarming
IEEE QP++

First install all dependencies

```bash
npm install
```



To get started and run a local version do

```bash
nodemon app.js
```

This starts the server that serves our API and processes data from our sensors that send data to the server. This is eventually hosted on this link https://personal-farming.herokuapp.com/

To start up the website/platform, go to the `web` folder and run

```bash
npm start
```



## Structure

Everything under the `web` folder is for the website and platform

The app.js file is for starting up the server

### Web

Everything relevant goes into the `src` folder generally

React works by components, so we have different components for pages and parts for those pages (such as a graph visualizer, login card, a notification card etc.)

These components are in the `components` folder.

### Server

All server files are found in root folder. We are using express and node as the backend (easy to setup)

#### Routes

Folder contains API information (for processing POST and GET requests etc.)

#### Models

Folder contains schema information that is used by MongoDB and our server to send data easily to our database

#### Config

Folder that is just configuration details needed by MongoDB, probably don't need to change

#### 

