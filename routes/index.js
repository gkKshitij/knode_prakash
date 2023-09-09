const express = require('express');
const router = express.Router();

router.get('/test', function(req, res) {
    res.status(200).send({message: 'in index routerssssss'})
});

router.get('/home', function(req, res) {
    res.sendFile(__dirname+'/views/index.html'); 
});

module.exports = router;