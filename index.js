const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes");
const logger = require("./logger")

const SERVER_PORT = process.env.SERVER_PORT || 8080;

const app = express();
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "www")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", routes);

app.listen(SERVER_PORT, () => {
    logger.log("UI Microservice - started listening on port" + SERVER_PORT);
});