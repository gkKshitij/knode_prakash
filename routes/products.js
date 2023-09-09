const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');
const productValidator = require('../controllers/validator');
const { verifyToken } = require('../utils/jwt');

router
    .get('/getAllp',
        verifyToken,
        async function(req, res) {
            const response = await productsController.getAllProducts();
            res.status(response.statusCode);
            res.send(response.respData);
        });

router
    .post('/getOnep',
        verifyToken,
        productValidator.validate,
        async function(req, res) {
            const response = await productsController.getOneProduct(req.body);
            res.status(response.statusCode);
            res.send(response.respData);
        });

router
    .get('/getSDp', // SD = Soft Deleted product
        verifyToken,
        async function(req, res) {
            const response = await productsController.getAllSoftDeletedProducts();
            res.status(response.statusCode);
            res.send(response.respData);
        });

router
    .get('/getAllNonSDp',
        verifyToken,
        async function(req, res) {
            const response = await productsController.getAllNonSoftDeletedProducts();
            res.status(response.statusCode);
            res.send(response.respData);
        });

router
    .post('/addp',
        verifyToken,
        productValidator.validate,
        async function(req, res) {
            const response = await productsController.addProduct(req.body);
            res.status(response.statusCode);
            res.send(response.respData);
        });

router
    .post('/updatep',
        verifyToken,
        productValidator.validate,
        async function(req, res) {
            const response = await productsController.editProduct(req.body);
            res.status(response.statusCode);
            res.send(response.respData);
        });

router
    .post('/sdeletep',
        verifyToken,
        productValidator.validate,
        async function(req, res) {
            const response = await productsController.sDeleteProduct(req.body);
            res.status(response.statusCode);
            res.send(response.respData);
        });

router
    .delete('/deletep',
        verifyToken,
        productValidator.validate,
        async function(req, res) {
            const response = await productsController.deleteProduct(req.body);
            res.status(response.statusCode);
            res.send(response.respData);
        });


module.exports = router;