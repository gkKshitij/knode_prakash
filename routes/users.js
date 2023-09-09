const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const userValidator = require('../controllers/validator');
const { verifyToken } = require('../utils/jwt');

router
    .get('/getAll',
        verifyToken,
        async function(req, res) {
            const response = await usersController.getAllUsers();
            res.status(response.statusCode);
            res.send(response.respData);
        });

router
    .post('/add',
        verifyToken,
        userValidator.validate,
        async function(req, res) {
            const response = await usersController.addUser(req.body);
            res.status(response.statusCode);
            res.send(response.respData);
        });

router
    .delete('/delete',
        verifyToken,
        userValidator.validate,
        async function(req, res) {
            const response = await usersController.deleteUser(req.body);
            res.status(response.statusCode);
            res.send(response.respData);
        });

module.exports = router;