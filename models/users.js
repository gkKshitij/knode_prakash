const dbClient = require('../database/connection.js');
const { ObjectId } = require('mongodb');

module.exports = {
    async getAll() {
        try {
            const usersCollection = dbClient.db.collection("users");
            const allUsers = await usersCollection.find().toArray();

            return {
                err: null,
                data: allUsers
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
            const usersCollection = dbClient.db.collection("users");
            const addUserResponse = new Promise(async (resolve, reject) => {
                const response = await usersCollection.insertOne({
                    name: fields.name,
                    age: fields.age,
                    created_at: fields.currentTime
                });
                console.log('in add user promise');
                if(response && response.insertedId) {
                    resolve();
                } else {
                    reject();
                }
            });
            console.log('after add user promise');
            return await addUserResponse
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

            // const addUser = await usersCollection.insertOne({
            //     name: fields.name,
            //     age: fields.age,
            //     created_at: fields.currentTime
            // });

            // if(addUser && addUser.insertedId) {
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
            const usersCollection = dbClient.db.collection("users");
            const removeUserResponse = new Promise(async (resolve, reject) => {
                const response = await usersCollection.deleteOne({
                    _id: new ObjectId(fields.userId)
                });
                console.log('in delete user promise');
                if(response && response.deletedCount > 0) {
                    resolve();
                } else {
                    reject();
                }
            });
            console.log('after delete user promise');
            return await removeUserResponse
                .then((response) => {
                    return {
                        err: null,
                        data: []
                    };
                })
                .catch((response) => {
                    return {
                        err: "User doesn't exists.",
                        data: []
                    };
                });

            // const usersCollection = dbClient.db.collection("users");
            // const deleteUser = await usersCollection.deleteOne({
            //     _id: new ObjectId(fields.userId)
            // });

            // if(deleteUser && deleteUser.deletedCount > 0) {
            //     return {
            //         err: null,
            //         data: []
            //     };
            // } else {
            //     return {
            //         err: "User doesn't exists.",
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