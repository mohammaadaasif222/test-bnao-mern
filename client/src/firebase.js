
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "webyar-eddd2.firebaseapp.com",
  projectId: "webyar-eddd2",
  storageBucket: "webyar-eddd2.appspot.com",
  messagingSenderId: "915304260341",
  appId: "1:915304260341:web:597494e1ccb36e12645bbc",
  measurementId: "G-K9T6SJ79H0"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);