var express = require('express');
var cors = require("cors");
const router = require('express').Router();
var bodyParser = require("body-parser");
const ejs = require("ejs");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const HOST = 'localhost';
const PORT = 8000;
const parentRoutePath = "/api";

var app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.set("view engine", "ejs");
app.set("views", __dirname+'/views');

app.get(parentRoutePath, (req, res) => {
    res.status(200).json({ message: 'App Api Parent Route'});
});

const userRoutes = require('./routes/users');
app.use(parentRoutePath+"/users", userRoutes);

const productRoutes = require('./routes/products');
app.use(parentRoutePath+"/products", productRoutes);

app.use('/home', function(req, res) {
    res.render('index');
});

app.use('/books', function(req, res) {
    const books = [
        { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
        { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
        { id: 3, title: "1984", author: "George Orwell" },
    ];

    res.render('books', { books });
});

app.post("/user/generateToken", (req, res) => {
    // Validate User Here
    // Then generate JWT Token
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
    }
    const token = jwt.sign(data, jwtSecretKey);
    res.send(token);
});

app.get("/user/validateToken", (req, res) => {
    // Tokens are generally passed in the header of the request
    // Due to security reasons.
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    try {
        const token = req.header(tokenHeaderKey);
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            return res.send("Successfully Verified");
        }else{
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});