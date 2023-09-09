const httpCode = require('http-status-codes');

function validate(req, res, next) {
    var result = validateRequestInput(req);
    if (result.isValid) {
        next();
    } else {
        var respData = {
            success: false,
            data: [],
            message: result.errMsg
        }
        res.status(httpCode.StatusCodes.BAD_REQUEST);
        res.send(respData);
    }
}

function validateRequestInput(req) {
    var result = { isValid: true, errMsg: null }
    switch (req.path) {
        case '/add':
            var body = req.body;
            if (!body.hasOwnProperty('name')) {
                result.isValid = false;
                result.errMsg = "Valid name required";
                break;
            }
            if (!body.hasOwnProperty('age')) {
                result.isValid = false;
                result.errMsg = "Valid age required";
                break;
            } 
            break;

        case '/delete':
            var body = req.body;
            if (!body.hasOwnProperty('userId')) {
                result.isValid = false;
                result.errMsg = "Valid userId required";
                break;
            }
            break;

        case '/addp':
            var body = req.body;
            if (!body.hasOwnProperty('name')) {
                result.isValid = false;
                result.errMsg = "Valid name required";
                break;
            }
            if (!body.hasOwnProperty('category')) {
                result.isValid = false;
                result.errMsg = "Valid category required";
                break;
            } 
            if (!body.hasOwnProperty('description')) {
                result.isValid = false;
                result.errMsg = "Valid description required";
                break;
            } 
            if (!body.hasOwnProperty('price')) {
                result.isValid = false;
                result.errMsg = "Valid price required";
                break;
            } 
            if (!body.hasOwnProperty('quantity_avl')) {
                result.isValid = false;
                result.errMsg = "Valid quantity_avl required";
                break;
            } 
            if (!body.hasOwnProperty('isDeleted')) {
                result.isValid = false;
                result.errMsg = "Valid isDeleted required";
                break;
            } 
            break;

        case '/updatep':
            var body = req.body;
            if (!body.hasOwnProperty('name')) {
                result.isValid = false;
                result.errMsg = "Valid name required";
                break;
            }
            if (!body.hasOwnProperty('category')) {
                result.isValid = false;
                result.errMsg = "Valid category required";
                break;
            } 
            if (!body.hasOwnProperty('description')) {
                result.isValid = false;
                result.errMsg = "Valid description required";
                break;
            } 
            if (!body.hasOwnProperty('price')) {
                result.isValid = false;
                result.errMsg = "Valid price required";
                break;
            } 
            if (!body.hasOwnProperty('quantity_avl')) {
                result.isValid = false;
                result.errMsg = "Valid quantity_avl required";
                break;
            } 
            if (!body.hasOwnProperty('isDeleted')) {
                result.isValid = false;
                result.errMsg = "Valid isDeleted required";
                break;
            } 
            break;

        case '/deletep':
            var body = req.body;
            if (!body.hasOwnProperty('productId')) {
                result.isValid = false;
                result.errMsg = "Valid productId required";
                break;
            }
            break;

        case '/sdeletep':
            var body = req.body;
            if (!body.hasOwnProperty('name')) {
                result.isValid = false;
                result.errMsg = "Valid productId required";
                break;
            }
            break;

        case '/getOnep':
            var body = req.body;
            if (!body.hasOwnProperty('name')) {
                result.isValid = false;
                result.errMsg = "Valid name required";
                break;
            }
            break;

    }
    return result;
}

module.exports = {
    validate: validate,
    validateRequestInput: validateRequestInput
}