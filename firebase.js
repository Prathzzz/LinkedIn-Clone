// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB2bvDqki4RDbo40rb6xWLd-2IVpNqn0tw",
  authDomain: "linkedin-6b57c.firebaseapp.com",
  projectId: "linkedin-6b57c",
  storageBucket: "linkedin-6b57c.appspot.com",
  messagingSenderId: "1041136859260",
  appId: "1:1041136859260:web:ee11f150f922c9c00cb1f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
