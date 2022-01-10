import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDrucprmwBzgW5l84WcNRKaQf9nZF3tdOE",
  authDomain: "rnfirebasecrud-d69c0.firebaseapp.com",
  projectId: "rnfirebasecrud-d69c0",
  storageBucket: "rnfirebasecrud-d69c0.appspot.com",
  messagingSenderId: "777106988785",
  appId: "1:777106988785:web:05559fe54892f28af45350"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const firestore = getFirestore();