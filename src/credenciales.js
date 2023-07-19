// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlOHcpacZT-qmVfh3-3DrYXS-abbn06bA",
  authDomain: "app-cerveza-641f3.firebaseapp.com",
  projectId: "app-cerveza-641f3",
  storageBucket: "app-cerveza-641f3.appspot.com",
  messagingSenderId: "34648858927",
  appId: "1:34648858927:web:512da8eeb6893ebdf701da",
  measurementId: "G-27W6TW593Y"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;
// const analytics = getAnalytics(app);