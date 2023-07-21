// Import the required modules using require
require('dotenv').config({ path: '.././.env' });

const { initializeApp } = require("firebase/app");

// const firebaseConfig = {

//   apiKey: "AIzaSyC6nb0NiHkYOAs85Ep80-fHjrXKgNRS6UY",

//   authDomain: "journey-builder-21758.firebaseapp.com",

//   projectId: "journey-builder-21758",

//   storageBucket: "journey-builder-21758.appspot.com",

//   messagingSenderId: "169558195632",

//   appId: "1:169558195632:web:e5299ffdaa1c1ae8f12a75"

// };

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

let firebase = initializeApp(firebaseConfig);

module.exports = {
  firebase
}
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID
// };


