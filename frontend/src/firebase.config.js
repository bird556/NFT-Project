import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAte50jnv7hUjaB8hgOCJHjshw-M9ZvOkk',
  authDomain: 'crypto-nft-e347b.firebaseapp.com',
  projectId: 'crypto-nft-e347b',
  storageBucket: 'crypto-nft-e347b.appspot.com',
  messagingSenderId: '128948768096',
  appId: '1:128948768096:web:056c27056f13d51de46205',
};

initializeApp(firebaseConfig);
export const db = getFirestore();
