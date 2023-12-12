
const express = require("express");
const app = express();

let PORT = process.env.PORT || 4000;

// Routers
const apiRouter = require("./routes/apiRoutes");
const htmlRouter = require("./routes/htmlRoutes");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use(express.static("db"));
app.use(apiRouter);
app.use(htmlRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
