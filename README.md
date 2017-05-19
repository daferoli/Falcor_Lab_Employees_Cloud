# Falcor_Lab_Employees_Cloud
The cloud app containing Falcor for managing dataservices in the lab

### Setup

This lab requires Node/npm and Mongo:
 - https://docs.npmjs.com/getting-started/installing-node
 - https://docs.mongodb.com/manual/installation/

Once downloaded, Clone this lab and it's counterpart here: https://github.com/daferoli/Falcor_Lab_Employees_Backend

then run `npm install` and `npm start` to startup the server

### Using the model
The `index.html` file contains several examples for calling the model.
With the cloud and backend running (and the mongo server) you should be able
to use all of the available model get calls.

To access the index file, while the server is running, navigate your browser to:
`http://localhost:8000`

Currently there are 2 ways to view the data. after each model, there is a `.then`
function that occurs after the model returns the data. It's 2 parameters are the
success and failure functions. In the demo I used the function stored in the
`jconsole` variable. This outputs the data in the console in a pretty format.

There is also the `jlog` variable that if used, inserts the result into the html,
making it directly viewable, but not quite as pretty
