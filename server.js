var fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var exphbs = require('express-handlebars');

const app = express();

var passport = require('passport')
var session = require('express-session')


var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*passport*/
app.use(session({ secret: 'WorkIndia', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session());
/*?*/

app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

const db = require("./app/models");
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Todo" });
});


require("./app/routes/agents.routes")(app,passport);
require('./app/config/passport/passport.js')(passport, db.agent);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});