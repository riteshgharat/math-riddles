/*// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseApp = initializeApp({
  apiKey: "AIzaSyBu22TYWwh2__9noDDEPmA_MsnhWpOoD24",
  authDomain: "mathriddles-7d130.firebaseapp.com",
  databaseURL: "https://mathriddles-7d130-default-rtdb.firebaseio.com",
  projectId: "mathriddles-7d130",
  storageBucket: "mathriddles-7d130.appspot.com",
  messagingSenderId: "34816517829",
  appId: "1:34816517829:web:4bd7c611a4ca10ad1532ac"
});

const auth = getAuth(firebaseApp);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User logged in" + user.name)
  } else {
    console.log("User logged out")
  }
})

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
*/