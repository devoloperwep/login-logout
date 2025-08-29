import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV8i-x92BD82CJkqDV2f_1jz9il6mSe5s",
  authDomain: "task-ai-d92ad.firebaseapp.com",
  projectId: "task-ai-d92ad",
  storageBucket: "task-ai-d92ad.firebasestorage.app",
  messagingSenderId: "153350915620",
  appId: "1:153350915620:web:e7bf21829127ea60db3ab1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
