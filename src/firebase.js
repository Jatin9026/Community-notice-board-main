import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLoDGAVqGv2oDJ5eq8RhNsBfUq88R8h2A",
  authDomain: "community-manager-b63fa.firebaseapp.com",
  databaseURL:"https://community-manager-b63fa-default-rtdb.firebaseio.com",
  projectId: "community-manager-b63fa",
  storageBucket: "community-manager-b63fa.firebasestorage.app",
  messagingSenderId: "243722562693",
  appId: "1:243722562693:web:c636cd792dc55022e3cdec",
  measurementId: "G-T8YEL2JE1N"
};

// Validate Firebase config
const validateConfig = (config) => {
  const required = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
  const missing = required.filter(key => !config[key]);

  if (missing.length > 0) {
    throw new Error(`Missing Firebase config: ${missing.join(', ')}`);
  }

  return true;
};

// Initialize Firebase with error handling
let app;
let db;

try {
  validateConfig(firebaseConfig);
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);

  // Log successful initialization
  console.log('Firebase initialized successfully');

  // In development, you can connect to emulator
  if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_USE_EMULATOR) {
    connectFirestoreEmulator(db, 'localhost', 8080);
    console.log('Connected to Firestore emulator');
  }

} catch (error) {
  console.error('Firebase initialization failed:', error);
  throw error;
}

export { db };
export default app; 