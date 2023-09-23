// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDz-fLJi-Pt37741KTiiUCaRgXZBOkSpYs",
  authDomain: "otp-authentication-3136f.firebaseapp.com",
  projectId: "otp-authentication-3136f",
  storageBucket: "otp-authentication-3136f.appspot.com",
  messagingSenderId: "154441167523",
  appId: "1:154441167523:web:f5566c2ea2061810580516",
  measurementId: "G-E2F5TBW449"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
