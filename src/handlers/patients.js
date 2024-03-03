const { MongoClient, ServerApiVersion } = require("mongodb");

// Replace the placeholder with your Atlas connection string
const uri = "mongodb://taesuser:taespassword@mongodb:27017";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

const db = client.db("taes")
const patientsCollection = db.collection('patients')
const docs = db.collection('docs')


async function getAll(req, res) {
    let output = {}
    let results = patientsCollection.find()
    for await (let doc of results) {
        output[doc.dodid] = doc
    }
    res.json(output)
}

async function getOne(req, res) {
    let dodid = req.params.dodid
    let output = await patientsCollection.findOne({dodid})
    res.json(output)
}

async function setOne(req, res) {
    let dodid = req.params.dodid
    let patient = req.body
    delete patient._id
    let resp = await patientsCollection.findOneAndUpdate({dodid}, {$set: {...patient}}, {upsert: true})
    res.json(resp)
}

async function create(req, res) {
    let doc = req.body
    let resp = await patientsCollection.insertOne(doc)
    res.json(resp)
}

async function getDocs(req, res) {
    let dodid = req.params.dodid
    let resp = await docs.findOne({dodid})
    if (!resp) {
        await docs.insertOne({
            dodid,
            docs: []
        })
        resp = {
            dodid,
            docs: []
        }
    }
    console.log(resp)
    res.json(resp.docs)
}

async function setDocs(req, res) {
    let dodid = req.params.dodid
    let incomingDocs = req.body
    console.log(incomingDocs)
    let resp = await docs.findOneAndUpdate({dodid}, {$set: {docs: incomingDocs}})
    res.json(resp)
}

const patients = {
    getAll,
    getOne,
    setOne,
    create,
    getDocs,
    setDocs
}

module.exports = patients