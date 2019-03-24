const mongoClient = require("mongodb").MongoClient
const ObjectId = require("mongodb").ObjectId

mongoClient.connect("mongodb://localhost/sacoleirasdb", {
        useNewUrlParser: true
    })
    .then(conn => global.conn = conn.db("sacoleirasdb"))
    .catch(err => console.error(err))

function findAll(collection, callback) {
    global.conn.collection(collection).find({}).toArray(callback);
}

function findOne(id, collection, callback) {
    global.conn.collection(collection).find(new ObjectId(id)).toArray(callback);
}

function insert(customer, collection, callback) {
    global.conn.collection(collection).insert(customer, callback)
}

function update(id, customer, collection, callback) {
    global.conn.collection(collection).updateOne({
        _id: new ObjectId(id)
    }, {
        $set: customer
    }, callback)
}

module.exports = {
    findAll,
    findOne,
    insert,
    update
}