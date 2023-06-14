const { MongoClient } = require('mongodb');
const mongoose = require('mongoose')
const uri = 'mongodb+srv://danaaka8:p6TPp7ILrQUlDKfE@cluster0.uyhqfof.mongodb.net/technicians'; // Replace with your MongoDB connection URI
// const dbName = 'technicians'; // Replace with your MongoDB database name

const client = new MongoClient(uri, { useUnifiedTopology: true });

let db;

client.connect()
  .then((x) => console.log('connected'))
  .catch(() => console.log('error with connection'))

mongoose.connect(uri).then(() => console.log('connected mongoose'))
