// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAte50jnv7hUjaB8hgOCJHjshw-M9ZvOkk',
  authDomain: 'crypto-nft-e347b.firebaseapp.com',
  projectId: 'crypto-nft-e347b',
  storageBucket: 'crypto-nft-e347b.appspot.com',
  messagingSenderId: '128948768096',
  appId: '1:128948768096:web:056c27056f13d51de46205',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
