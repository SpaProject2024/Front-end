// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD4s-1h3aF0D-ZhGLT2X_hRIKmsYvp-EfU",
  authDomain: "bellavitabeauty-f81ae.firebaseapp.com",
  projectId: "bellavitabeauty-f81ae",
  storageBucket: "bellavitabeauty-f81ae.appspot.com",
  messagingSenderId: "298772881290",
  appId: "1:298772881290:web:7ccad71818771fe3587273",
  measurementId: "G-R0MDGF62LQ"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

export default app;
