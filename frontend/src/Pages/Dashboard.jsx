import { useState, useEffect } from 'react';
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';
import LineLoader from '../components/LineLoader';

function Dashboard() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [nfts, setNfts] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    const fetchUserNFTs = async () => {
      const listingsRef = collection(db, 'nfts');
      const q = query(
        listingsRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      );
      const querySnap = await getDocs(q);

      let nfts = [];

      querySnap.forEach((doc) => {
        return nfts.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setNfts(nfts);
      setLoading(false);
    };

    fetchUserNFTs();
  }, [auth.currentUser.uid]);
  console.log(nfts);

  if (loading) {
    return <LineLoader />;
  } else if (auth.currentUser) {
    return (
      <div className="min-h-screen">
        <h1 className="text-primary text-2xl">
          Welcome Back, {auth.currentUser.displayName}
        </h1>
        <h1 className="text-primary text-lg">{auth.currentUser.email}</h1>
      </div>
    );
  }

  return <div>Dashboard</div>;
}

export default Dashboard;
