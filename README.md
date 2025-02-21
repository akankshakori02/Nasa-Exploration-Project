# Getting Started with NASA Exploratory React Application

## Prerequisites
Node.js
npm or yarn

# Installation
## Clone repository
`git clone https://github.com/akankshakori02/nasa-data-explorer.git`

## Install backend dependencies
`cd backend`
`npm install`

## Install frontend dependencies
`cd ../frontend`
`npm install`

## Set up environment variables:
Create a `.env` file in the backend directory. // already set in this repo
Add `NASA_API_KEY`=your_nasa_api_key_here. // you can set port as well

# Running the Application
## Start backend server
`cd backend`
`npm start`

## Start frontend application
`cd ../frontend`
`npm start`

Open your browser and navigate to `http://localhost:3000`

# Testing
Frontend Testing: Can be found in App.test.js & index.js
cd frontend
`npm test`
Backend Testing: Can be found in server.test.js

# Repository Organization
nasa-data-explorer/
├── frontend/                       # Contains all the frontend code of the React application
│   ├── public/                     # Public folder containing static assets
│   │   ├── index.html              # The main HTML file
│   │   └── favicon.ico             # Favicon for the website
│   ├── src/                        # Source files for the React application
│   │   ├── components/             # Reusable UI components
│   │   │   ├── APOD.js             # Displays the Astronomy Picture of the Day
│   │   │   ├── EPIC.js             # Shows Earth images from the EPIC camera
│   │   │   ├── MarsRover.js        # Views Mars Rover photos with lazy loading for images
│   │   │   ├── Header.js           # Navigation header component with links to various data endpoints
│   │   │   ├── Footer.js           # Footer component with links to social media and other resources
│   │   │   ├── UserName.js         # Interactive modal for user name input
│   │   │   └── Facts.js            # Displays random space facts in a dismissible toast component
│   │   ├── data/                   # Data utilities or constant data
│   │   │   ├── camera.types.js     # Definitions of camera types for Mars Rover photos
│   │   │   └── SpaceFacts.js       # Static data file containing space facts
│   │   ├── App.js                  # Main React component that wraps all other components
│   │   ├── index.js                # Entry point for the React app, sets up root component
│   │   ├── index.css               # Base CSS file for the project
│   │   ├── index.test.js           # Test case for index.js
|   |   └── App.test.js             # Test Cases for all components
│   └── package.json                # Defines dependencies, scripts, etc.
├── backend/                        # Node.js/Express server that handles backend logic
│   ├── server.js                   # Main server file that sets up endpoints and server configuration
│   └── package.json                # Defines backend dependencies and scripts
└── README.md                       # Documentation of the project, setup, and usage instructions

# Description of Key Components
## frontend/src/components/:
APOD.js: Connects to NASA's APOD API to retrieve and display the astronomy picture of the day along with its description.
EPIC.js: Fetches and shows images of Earth using NASA's EPIC API, with options to toggle between image types.
MarsRover.js: Allows users to view photos from Mars rovers and includes functionality to Lazyload image and filter images by the camera used.
Header.js and Footer.js: Provide navigation and additional information, enhancing the site's usability and aesthetics.
UserName.js: Engages first-time users to enter their name for a personalized experience.
Facts.js: Displays educational space facts, enhancing the informational value of the app.

## backend/server.js:
Sets up Express server routes to handle requests for NASA data.
Uses axios to fetch data from NASA's APIs and serves it to the frontend, abstracting API logic from the client side.

# Deployment
Live: https://nasa-exploration-project-frontend.vercel.app/
GitHub: https://github.com/akankshakori02/Nasa-Exploration-Project

