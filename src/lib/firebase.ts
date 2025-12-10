import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Firebase configuration
// IMPORTANT: Use environment variables for security
// Create a .env file in the root directory with your Firebase config
// The .env file is gitignored and won't be pushed to GitHub
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAnVLDLL8TGjaKQ5nQtpMpRfWphFeiwTKo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "pavepath-design-efd5b.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "pavepath-design-efd5b",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "pavepath-design-efd5b.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "483676537326",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:483676537326:web:f1d3eac92ca5d8a01e8eff",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-RSEYH2HN7C"
};

// Note: Firebase API keys are public by design and safe to expose in client-side code
// However, security is enforced through Firestore security rules
// Using environment variables is still recommended for better configuration management

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (only in browser environment)
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== 'undefined') {
  // Initialize analytics asynchronously
  isSupported().then((supported) => {
    if (supported) {
      try {
        analytics = getAnalytics(app);
      } catch (error) {
        console.warn('Firebase Analytics initialization error:', error);
      }
    }
  }).catch(() => {
    // Analytics not supported or failed to initialize
    console.warn('Firebase Analytics is not supported in this environment');
  });
}

export { analytics };
export default app;

