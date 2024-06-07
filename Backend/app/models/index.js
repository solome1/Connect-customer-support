const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.company = require("./company.model.js")(mongoose);
db.customer = require("./customer.model.js")(mongoose);
db.agent = require("./agent.model.js")(mongoose);
module.exports = db;