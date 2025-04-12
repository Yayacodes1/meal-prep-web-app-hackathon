import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLcqeRAzLGk1eEbzrzvqYitO2RqBOsDBQ",
  authDomain: "meal-prep-web-app-8de5f.firebaseapp.com",
  projectId: "meal-prep-web-app-8de5f",
  storageBucket: "meal-prep-web-app-8de5f.appspot.com",
  messagingSenderId: "629734141662",
  appId: "1:629734141662:web:30f706f54633d5f5e5dc4f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app; 