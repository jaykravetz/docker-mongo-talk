// CRUD

// Create a simple document
db.getCollection("people").insert({
  firstName: "Jill",
  lastName: "Ian"
})


// create a simple document with another "schema"
db.getCollection("people").insert({
  make: "ford",
  model: "explorer"
})

// create a document with nested data
db.getCollection("people").insert({
  firstName: "jay",
  lastName: "kravetz",
  phoneNumbers: [
    { type: "cell", phone: "848-525-5555" },
    { type: "home", phone: "732-363-2222"}
  ]
})

// insert many records
db.getCollection("people").insertMany([
  { name: "document 1" },
  { name: "document 2" },
  { name: "document 3"}
])

// Update a record
db.getCollection("people").update({
  firstName: "Jill",
  lastName: "Ian"
}, {
  age: 19
})

// Oops! No Set!!
db.getCollection("people").update(
  // Match
  {
    firstName: "Jill",
    lastName: "Ian"
  },
  // Actions
  {
    $set: {
      age: 19
    }
  }
)

// Increment numbers!
db.getCollection("people").update({
  firstName: "Jill",
  lastName: "Ian"
},
  {
    $inc: { age: 1 }
  })


// Update nested data
db.getCollection("people").update({
  _id: ObjectId("5b2048f6f8800fe8c57160df"),
  "phoneNumbers.type": "cell"
},
  {
    $set: {
      "phoneNumbers.$.phone": "1234567890"
    }
  })

// find all documents
db.getCollection("people").find({})


// Find one -> returns a single document and not an array
db.getCollection("people").findOne({ firstName: "Jill" })


// Sort results
db.getCollection("people").find({}).sort({ firstName: 1, lastName: 1 })

// Only get some fields
db.getCollection("people").find({}, { firstName: 1, lastName: 1 })

// exclude the id
db.getCollection("people").find({}, { _id: 0, firstName: 1, lastName: 1 })

// Javascript Code!
db.system.js.save({
  _id: "toLower",
  value: function(str) {
    return str.toLowerCase()
  }
})

db.getCollection("people").find({
  $where: "toLower(this.firstName) === 'jill'"
})

// Aggregations
db.getCollection("expenses").insertMany([
  { category: "food", price: 20.65 },
  { category: "food", price: 3.04 },
  { category: "food", price: 14.55 },
  { category: "food", price: 16.01 },
  { category: "fuel", price: 43.71 },
  { category: "fuel", price: 6.01 },
  { category: "fuel", price: 25.14 },
  { category: "fuel", price: 8.95 }
])

db.getCollection("expenses").aggregate([
  { $match: {} },
  { $group: { _id: "$category", count: { $sum: 1 }, total: { $sum: "$price" } } }
])

// Delete
