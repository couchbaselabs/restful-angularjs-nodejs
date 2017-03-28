var express = require("express");
var bodyParser = require("body-parser");
var couchbase = require("couchbase");
var path = require("path");
var config = require("./config");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Global declaration of the Couchbase server and bucket to be used
module.exports.bucket = (new couchbase.Cluster(process.env.COUCHBASE_HOST || config.couchbase.server)).openBucket(process.env.COUCHBASE_BUCKET || config.couchbase.bucket);

app.use(express.static(path.join(__dirname, "public")));

// All endpoints to be used in this application
var routes = require("./routes/routes.js")(app);

var server = app.listen(process.env.COUCHBASE_PORT || 3000, function () {
    console.log("Listening on port %s...", server.address().port);
});
