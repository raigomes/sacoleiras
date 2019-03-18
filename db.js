const mongoClient = require("mongodb").MongoClient

mongoClient.connect("mongodb://localhost/sacoleirasdb", {
        useNewUrlParser: true
    })
    .then(conn => global.conn = conn.db("sacoleirasdb"))
    .catch(err => console.error(err))

function findAll(callback) {
    global.conn.collection("customers").find({}).toArray(callback);
}

function insert(customer, callback) {
    global.conn.collection("customers").insert(customer, callback)
}

module.exports = {
    findAll,
    insert
}