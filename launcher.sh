#!/bin/bash

# Define the base directory assuming the script is run from the directory containing BackEnd and Frontend
BASEDIR=$(dirname "$0")

# Move into the BackEnd directory, install dependencies, and start the backend
cd "$HOME/EfreiArcade/Corpo/BackEnd" || exit
echo "Installing dependencies for BackEnd..."
npm install
echo "Launching BackEnd..."
node app.js & # The '&' at the end runs the server in the background
echo "BackEnd is running at http://localhost:2000"

# Move into the FrontEnd directory, install dependencies, and start the frontend
cd "$HOME/EfreiArcade/Corpo/FrontEnd" || exit
echo "Installing dependencies for FrontEnd..."
npm install
echo "Launching FrontEnd..."
npm run build &
echo "FrontEnd is running at http://localhost:5173"

# Wait for background jobs to finish
wait
