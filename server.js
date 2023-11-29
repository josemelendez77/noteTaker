// DEPENDENCIES
// Set-up express server & tell node we are creating an express server
const express = require("express");
const app = express();

// Sets an initial port for listener
let PORT = process.env.PORT || 4000;

// Routers
const apiRouter = require("./routes/apiRoutes");
const htmlRouter = require("./routes/htmlRoutes");


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware - node girls step 6 - https://node-girls.gitbook.io/intro-to-express/
app.use(express.static("public"));
app.use(express.static("db"));
// order matters here!
app.use(apiRouter);
app.use(htmlRouter);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//run 'npm start' or 'nodemon server.js' to start the server
//https://medium.com/@ralph1786/how-to-setup-an-express-server-5fd9cd9ae073