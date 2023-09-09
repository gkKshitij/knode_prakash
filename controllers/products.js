const httpCode = require('http-status-codes');
const moment = require('moment');

const productsModel = require('../models/products');

async function getAllProducts() {
    try {
        const response = await productsModel.getAll();

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

async function getOneProduct(reqBody) {
    try {
        const response = await productsModel.getOne({
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
                    message: "Product not found"
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

async function getAllSoftDeletedProducts() {
    try {
        const response = await productsModel.getSD();

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
                    message: "success on searching soft deleted"
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

async function getAllNonSoftDeletedProducts() {
    try {
        const response = await productsModel.getNSD();

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
                    message: "success on searching non soft deleted"
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

async function addProduct(reqBody) {
    try {
        const response = await productsModel.add({
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
                    message: "Product added successfully."
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

async function editProduct(reqBody) {
    try {
        const response = await productsModel.edit({
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
                    message: "Product edited successfully."
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

async function sDeleteProduct(reqBody) {
    try {
        const response = await productsModel.sDelete({
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
                    message: "Product soft deleted successfully."
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

async function deleteProduct(reqBody) {
    try {
        const response = await productsModel.remove(reqBody);

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
                    message: "Product deleted successfully."
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
    getAllProducts: getAllProducts,
    addProduct: addProduct,
    deleteProduct: deleteProduct,
    getOneProduct: getOneProduct,
    getAllSoftDeletedProducts: getAllSoftDeletedProducts,
    getAllNonSoftDeletedProducts: getAllNonSoftDeletedProducts,
    editProduct: editProduct,
    sDeleteProduct: sDeleteProduct
}