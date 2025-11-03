import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export interface Station {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  price_per_liter: number;
  address?: string;
  services?: string[];
  updated_at?: string;
  distance?: number; // Will be added dynamically
}

export const getStations = async (): Promise<Station[]> => {
  const stationsCol = collection(db, 'stations');
  const stationSnapshot = await getDocs(stationsCol);
  const stationList = stationSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Station[];
  return stationList;
}