const { config } = require('dotenv');
const express = require('express');
const app = express();
require("./models/config")
require('dotenv').config()
const mainRoutes = require('./routes/mainRouter')

app.use(express.json());
app.use('/', mainRoutes)

const server = app.listen(8888, () => {
    console.log(`server running on Port no ${process.env.PORT}`)
})

module.exports = server;