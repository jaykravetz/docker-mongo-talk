const express = require("express");
const mongo = require("mongodb").MongoClient;

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
	console.log(m);
	m.collection("people").find({}).toArray(function(err, results) {
		console.log(err, results);
		res.send(results);
	});
});

app.listen(8080, function() {
	console.log("Listening...");
});
