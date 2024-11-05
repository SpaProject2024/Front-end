// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDRJ9tjxc-zpdRrQPyRPcVyyQAI4AW4fuA",
    authDomain: "bellavita-5e4e9.firebaseapp.com",
    projectId: "bellavita-5e4e9",
    storageBucket: "bellavita-5e4e9.appspot.com",
    messagingSenderId: "301168463997",
    appId: "1:301168463997:web:db57b2ab030305d460a114",
    measurementId: "G-EEFZY4ZGZK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, analytics, storage };