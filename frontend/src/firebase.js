import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkNY9_7LZeg-jU54s1zTTDEAagtC9actA",
  authDomain: "advyka-events.firebaseapp.com",
  databaseURL: "https://advyka-events-default-rtdb.firebaseio.com",
  projectId: "advyka-events",
  storageBucket: "advyka-events.firebasestorage.app",
  messagingSenderId: "122590906175",
  appId: "1:122590906175:web:58889540498ef6486a758a",
  measurementId: "G-MRTHTDXSZE"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };