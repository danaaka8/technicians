const admin = require('firebase-admin')
const firebaseConfig = require('../firebaseConnection.json')

admin.initializeApp({
  credential:admin.credential.cert(firebaseConfig),
})
