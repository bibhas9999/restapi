const express = require("express");
const app = express();
const morgan = require('morgan');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const mongodb=require("mongodb");
const MongoClient = require('mongodb').MongoClient;


const productRouter = require("./router/product");
const orderRouter = require("./router/order");
const { access } = require("fs");

// mongoose.connect("mongodb+srv://bibhasdhula1:" +process.env.MONGO_ATLAS_PW+  "@cluster0.vdo1dvk.mongodb.net/",
//     {
//         //useMongoClient: true 
//     })

mongoose.connect("mongodb://127.0.0.1:27017/admin")

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/product", productRouter);
app.use("/order", orderRouter);

// app.use((req, resp, next) => {
//     resp.header("Access-Control-Allow-Origin", "*");
//     resp.header("Access-Control-Allow-Header",
//         "Origin,X-requested-with,Content-type,Accecpted,Authorization");
//     if (req.method === 'OPTIONS') {
//         resp.header('Access-Control-Allow-Methods', "GET,POST,PATCH,DELET,PUT");
//         return resp.status(200).json()
//     };
//     next()

// });

app.use((req, resp, next) => {
    const error = new Error("not found");
    error.status = 404;
    next(error);
});

app.use((error, req, resp, next) => {
    resp.status(error.status || 500);
    resp.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;