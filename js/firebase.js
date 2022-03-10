//<!--script src="js/firebase.js" type="module"></script>
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3zflWZnthLWsrqY-D_L6S2dcwxc_UBJk",
  authDomain: "mathriddles-1992d.firebaseapp.com",
  databaseURL: "https://mathriddles-1992d-default-rtdb.firebaseio.com",
  projectId: "mathriddles-1992d",
  storageBucket: "mathriddles-1992d.appspot.com",
  messagingSenderId: "568320559364",
  appId: "1:568320559364:web:5f58cbc6dc463fc7ac6851",
  measurementId: "G-LYF0VGYMF8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
