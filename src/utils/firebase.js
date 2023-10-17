// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "nextjs-blog-tutorial.firebaseapp.com",
  projectId: "nextjs-blog-tutorial",
  storageBucket: "nextjs-blog-tutorial.appspot.com",
  messagingSenderId: "863058716717",
  appId: "1:863058716717:web:f1d2f687130713eb9730a4"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)