const mongoose = require("mongoose");
require('colors')
require('dotenv').config();
mongoose.connect(process.env.url, { useNewUrlParser: true });
const connection = mongoose.connection;
mongoose.set("strictQuery", false);
connection.once('open', () => {
    console.log("MongoDB Database connection established successfully".blue);
});
