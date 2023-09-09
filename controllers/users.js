const httpCode = require('http-status-codes');
const moment = require('moment');

const usersModel = require('../models/users');

async function getAllUsers() {
    try {
        const response = await usersModel.getAll();

        if (response.err) {
            return {
                statusCode: httpCode.StatusCodes.INTERNAL_SERVER_ERROR,
                respData: {
                    success: false,
                    data: [],
                    message: response.err
                }
            };
        } else {
            return {
                statusCode: httpCode.StatusCodes.OK,
                respData: {
                    success: true,
                    data: response.data,
                    message: "success"
                }
            };
        }
    } catch (err) {
        return {
            statusCode: httpCode.StatusCodes.INTERNAL_SERVER_ERROR,
            respData: {
                success: false,
                data: [],
                message: err.message
            }
        };
    }
}

async function addUser(reqBody) {
    try {
        const response = await usersModel.add({
            ...reqBody,
            currentTime: moment().format('YYYY-MM-DD hh:mm:ss')
        });

        if (response.err) {
            return {
                statusCode: httpCode.StatusCodes.INTERNAL_SERVER_ERROR,
                respData: {
                    success: false,
                    data: [],
                    message: response.err
                }
            };
        } else {
            return {
                statusCode: httpCode.StatusCodes.OK,
                respData: {
                    success: true,
                    data: response.data,
                    message: "User added successfully."
                }
            };
        }
    } catch (err) {
        return {
            statusCode: httpCode.StatusCodes.INTERNAL_SERVER_ERROR,
            respData: {
                success: false,
                data: [],
                message: err.message
            }
        };
    }
}

async function deleteUser(reqBody) {
    try {
        const response = await usersModel.remove(reqBody);

        if (response.err) {
            return {
                statusCode: httpCode.StatusCodes.INTERNAL_SERVER_ERROR,
                respData: {
                    success: false,
                    data: [],
                    message: response.err
                }
            };
        } else {
            return {
                statusCode: httpCode.StatusCodes.OK,
                respData: {
                    success: true,
                    data: response.data,
                    message: "User deleted successfully."
                }
            };
        }
    } catch (err) {
        return {
            statusCode: httpCode.StatusCodes.INTERNAL_SERVER_ERROR,
            respData: {
                success: false,
                data: [],
                message: err.message
            }
        };
    }
}

module.exports = {
    getAllUsers: getAllUsers,
    addUser: addUser,
    deleteUser: deleteUser
}