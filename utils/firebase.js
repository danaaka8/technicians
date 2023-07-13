const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket:'techs-5d753.appspot.com'
});

const bucket = admin.storage().bucket('techs-5d753.appspot.com');

module.exports = bucket