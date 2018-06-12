const express = require("express");
const mongo = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId

let db;

async function getDb() {
	if (!db) {
		let client = await mongo.connect("mongodb://localhost:27017");
		db = client.db("babysitters");
	}
	return db;
}


let app = express();

app.use(express.static(__dirname + "/app"));

app.get("/", function(req, res) {
	res.status(200).send({ success: true });
});

app.get("/babysitters", async function (req, res) {
	let m = await getDb();

	m.collection("people").find({}).toArray(function(err, results) {
		res.send(results);
	});
});

app.delete("/babysitters/:id", async function(req, res) {
	console.log(req.params.id);
	let m = await getDb();
	m.collection("people").deleteOne({ _id: ObjectId(req.params.id) }, function(err, result) {
		console.log(err);
		console.log(result);
    res.status(204).send();
	});
});

app.listen(8080, function() {
	console.log("Listening...");
});
