// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAM8jeZqZqHN74pb9RTFf9xdXzfpqiVwIk",
//   authDomain: "pos-software-697db.firebaseapp.com",
//   projectId: "pos-software-697db",
//   storageBucket: "pos-software-697db.appspot.com",
//   messagingSenderId: "71471844316",
//   appId: "1:71471844316:web:dbb2f7c1b031500b245d19"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDbb3FmaOh3uvKOFOjJExQE_17Wvigw8Xw",
  authDomain: "pos-client-794bf.firebaseapp.com",
  projectId: "pos-client-794bf",
  storageBucket: "pos-client-794bf.firebasestorage.app",
  messagingSenderId: "1068108151035",
  appId: "1:1068108151035:web:cc6d1c6043105630d9585e"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);