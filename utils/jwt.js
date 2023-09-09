const httpCode = require('http-status-codes');

function verifyToken(req, res, next) {
    if (req.headers['authorization']==='kgk'){
        // console.log('here')
        // console.log(req.rawHeaders[1])
        // console.log(req.headers['authorization'])
        // req.user = {
        //     id: 12345
        // };
        next();
    } else {
        res.status(httpCode.StatusCodes.UNAUTHORIZED)
        res.send({
            success: false,
            data: [],
            message: "Unauthorized user"
        });
    }
}


module.exports = {
    verifyToken
}