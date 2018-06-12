const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;
const faker = require("faker");

let data = [];

while (data.length !== 100) {
  data.push({
    firstName: faker.name.firstName("female"),
    lastName: faker.name.lastName(),
    age: faker.random.number({ min: 17, max: 23 }),
    hasCar: faker.random.boolean(),
    pricePerHour: faker.random.number({ min:8, max: 18 }),
    phone: faker.phone.phoneNumber("(732) ###-####"),
    days: [
      {
        sunday: faker.random.boolean(),
        monday: faker.random.boolean(),
        tuesday: faker.random.boolean(),
        wednesday: faker.random.boolean(),
        thursday: faker.random.boolean()
      }
    ]
  });
}

MongoClient.connect("mongodb://localhost:27017")
  .then(async client => {

    let db = client.db("babysitters").collection("people");

    await db.deleteMany({});
    await db.insertMany(data);
    return db;
  })
  .then(() => process.exit(0));


