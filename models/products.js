const dbClient = require('../database/connection.js');
const { ObjectId } = require('mongodb');

module.exports = {
    async getAll() {
        try {
            const productsCollection = dbClient.db.collection("products");
            const allProducts = await productsCollection.find().toArray();

            return {
                err: null,
                data: allProducts
            };
        } catch (err) {
            return {
                err: err.message ?? "Something went wrong.",
                data: []
            };
        }
    },

    async getOne(fields) {
        try {
            const productsCollection = dbClient.db.collection("products");
            console.log(fields);
            var query = { name: fields.name };
            const allProducts = await productsCollection.find(query).toArray();
            console.log(allProducts);

            return {
                err: null,
                data: allProducts
            };
        } catch (err) {
            return {
                err: err.message ?? "Something went wrong.",
                data: []
            };
        }
    },
    //     try {
    //         const productsCollection = dbClient.db.collection("products");
    //         const filter = { name: fields.name };
    //         const options = { upsert: false };
    //         const updateDoc = {
    //             $set:
    //             {
    //             category: fields.category,
    //             description: fields.description,
    //             price: fields.price,
    //             quantity_avl: fields.quantity_avl,
    //             isDeleted: fields.isDeleted,
    //             }
    //         }
    //         const editProductResponse = new Promise(async (resolve, reject) => {
    //             const response = await productsCollection.updateOne(filter, updateDoc, options);
    //             console.log(`A product was updated: ${JSON.stringify(response, null, 4)}`);
    //             console.log(fields);
    //             console.log('in edit product promise');
    //             if(response && response.modifiedCount) {
    //                 resolve();
    //             } else {
    //                 reject();
    //             }
    //         });
    //         console.log('after edit product promise');
    //         return await editProductResponse
    //             .then((response ) => {
    //                 return {
    //                     err: null,
    //                     data: []
    //                 };
    //             })
    //             .catch((response) => {
    //                 return {
    //                     err: "Something went wrong",
    //                     data: []
    //                 };
    //             });

    //         // const editProduct = await productsCollection.insertOne({
    //         //     name: fields.name,
    //         //     age: fields.age,
    //         //     created_at: fields.currentTime
    //         // });

    //         // if(editProduct && editProduct.insertedId) {
    //         //     return {
    //         //         err: null,
    //         //         data: []
    //         //     };
    //         // } else {
    //         //     return {
    //         //         err: "Something went wrong",
    //         //         data: []
    //         //     };
    //         // }
    //     } catch (err) {
    //         return {
    //             err: err.message ?? "Something went wrong.",
    //             data: []
    //         };
    //     }
    // },















    //     try {
    //         const productsCollection = dbClient.db.collection("products");
    //         console.log(fields);

    //         const oneProductResponse = new Promise(async (resolve, reject) => {
    //             const response = await productsCollection.findOne({
    //                 name: new ObjectId(fields?.name)
    //             });
    //             console.log('in find product promise');
    //             console.log(fields?.name);
    //             if(response) {
    //                 resolve();
    //             } else {
    //                 reject();
    //             }
    //         });
    //         console.log('after find product promise');
    //         return await oneProductResponse
    //             .then((response) => {
    //                 return {
    //                     err: null,
    //                     data: []
    //                 };
    //             })
    //             .catch((response) => {
    //                 return {
    //                     err: "Product doesn't exists.",
    //                     data: []
    //                 };
    //             });
    //     } catch (err) {
    //         return {
    //             err: err.message ?? "Something went wrong.",
    //             data: []
    //         };
    //     }
    // },

    async getSD() {
        try {
            const productsCollection = dbClient.db.collection("products");
            var query = { isDeleted: "1" };
            const allProducts = await productsCollection.find(query).toArray();

            return {
                err: null,
                data: allProducts
            };
        } catch (err) {
            return {
                err: err.message ?? "Something went wrong.",
                data: []
            };
        }
    },
    async getNSD() {
        try {
            const productsCollection = dbClient.db.collection("products");
            var query = { isDeleted: "0" };
            const allProducts = await productsCollection.find(query).toArray();

            return {
                err: null,
                data: allProducts
            };
        } catch (err) {
            return {
                err: err.message ?? "Something went wrong.",
                data: []
            };
        }
    },
    async add(fields) {
        try {
            const productsCollection = dbClient.db.collection("products");
            const doc = {
                    name: fields.name,
                    category: fields.category,
                    description: fields.description,
                    price: fields.price,
                    quantity_avl: fields.quantity_avl,
                    isDeleted: fields.isDeleted,
                    created_at: fields.currentTime
                }
            const addProductResponse = new Promise(async (resolve, reject) => {
                const response = await productsCollection.insertOne(doc);
                console.log(`A document was inserted with the _id: ${response.insertedId}`);
                console.log('in add product promise');
                if(response && response.insertedId) {
                    resolve();
                } else {
                    reject();
                }
            });
            console.log('after add product promise');
            return await addProductResponse
                .then((response) => {
                    return {
                        err: null,
                        data: []
                    };
                })
                .catch((response) => {
                    return {
                        err: "Something went wrong",
                        data: []
                    };
                });

            // const addProduct = await productsCollection.insertOne({
            //     name: fields.name,
            //     age: fields.age,
            //     created_at: fields.currentTime
            // });

            // if(addProduct && addProduct.insertedId) {
            //     return {
            //         err: null,
            //         data: []
            //     };
            // } else {
            //     return {
            //         err: "Something went wrong",
            //         data: []
            //     };
            // }
        } catch (err) {
            return {
                err: err.message ?? "Something went wrong.",
                data: []
            };
        }
    },
    async edit(fields) {
        try {
            const productsCollection = dbClient.db.collection("products");
            const filter = { name: fields.name };
            console.log(fields);
            
            const options = { upsert: false };
            const updateDoc = {
                $set:
                {
                category: fields.category,
                description: fields.description,
                price: fields.price,
                quantity_avl: fields.quantity_avl,
                isDeleted: fields.isDeleted,
                }
            }
            const editProductResponse = new Promise(async (resolve, reject) => {
                const response = await productsCollection.updateOne(filter, updateDoc, options);
                console.log(`A product was updated: ${JSON.stringify(response, null, 4)}`);
                console.log(fields);
                console.log('in edit product promise');
                if(response && response.modifiedCount) {
                    resolve();
                } else {
                    reject();
                }
            });
            console.log('after edit product promise');
            return await editProductResponse
                .then((response ) => {
                    return {
                        err: null,
                        data: []
                    };
                })
                .catch((response) => {
                    return {
                        err: "Something went wrong",
                        data: []
                    };
                });

            // const editProduct = await productsCollection.insertOne({
            //     name: fields.name,
            //     age: fields.age,
            //     created_at: fields.currentTime
            // });

            // if(editProduct && editProduct.insertedId) {
            //     return {
            //         err: null,
            //         data: []
            //     };
            // } else {
            //     return {
            //         err: "Something went wrong",
            //         data: []
            //     };
            // }
        } catch (err) {
            return {
                err: err.message ?? "Something went wrong.",
                data: []
            };
        }
    },
    async sDelete(fields) {
        try {
            const productsCollection = dbClient.db.collection("products");
            const filter = { name: fields.name };
            const options = { upsert: false };
            const updateDoc = {
                $set:
                {
                isDeleted: "1",
                }
            }
            const sDeleteProductResponse = new Promise(async (resolve, reject) => {
                const response = await productsCollection.updateOne(filter, updateDoc, options);
                console.log(`A product was soft deleted: ${JSON.stringify(response, null, 4)}`);
                console.log(fields);
                console.log('in sDelete product promise');
                if(response && response.modifiedCount) {
                    resolve();
                } else {
                    reject();
                }
            });
            console.log('after sDelete product promise');
            return await sDeleteProductResponse
                .then((response ) => {
                    return {
                        err: null,
                        data: []
                    };
                })
                .catch((response) => {
                    return {
                        err: "Something went wrong",
                        data: []
                    };
                });

            // const sDeleteProduct = await productsCollection.insertOne({
            //     name: fields.name,
            //     age: fields.age,
            //     created_at: fields.currentTime
            // });

            // if(sDeleteProduct && sDeleteProduct.insertedId) {
            //     return {
            //         err: null,
            //         data: []
            //     };
            // } else {
            //     return {
            //         err: "Something went wrong",
            //         data: []
            //     };
            // }
        } catch (err) {
            return {
                err: err.message ?? "Something went wrong.",
                data: []
            };
        }
    },
    async remove(fields) {
        try {
            const productsCollection = dbClient.db.collection("products");
            const removeProductResponse = new Promise(async (resolve, reject) => {
                const response = await productsCollection.deleteOne({
                    _id: new ObjectId(fields.productId)
                });
                console.log(fields.productId);
                console.log('in delete product promise');
                if(response && response.deletedCount > 0) {
                    resolve();
                } else {
                    reject();
                }
            });
            console.log('after delete product promise');
            return await removeProductResponse
                .then((response) => {
                    return {
                        err: null,
                        data: []
                    };
                })
                .catch((response) => {
                    return {
                        err: "Product doesn't exists.",
                        data: []
                    };
                });

            // const productsCollection = dbClient.db.collection("products");
            // const deleteProduct = await productsCollection.deleteOne({
            //     _id: new ObjectId(fields.productId)
            // });

            // if(deleteProduct && deleteProduct.deletedCount > 0) {
            //     return {
            //         err: null,
            //         data: []
            //     };
            // } else {
            //     return {
            //         err: "Product doesn't exists.",
            //         data: []
            //     };
            // }
        } catch (err) {
            return {
                err: err.message ?? "Something went wrong.",
                data: []
            };
        }
    }
};