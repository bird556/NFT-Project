import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { SocialIcon } from 'react-social-icons';
import { ReactComponent as Google } from '../../assets/svg/google.svg';
import { motion } from 'framer-motion';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';
import LineLoader from '../LineLoader';

function SocialLogin() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  //Google Sign In Method
  const googleLogin = async (e) => {
    setLoading(true);

    try {
      const auth = getAuth();

      const googleProvider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;
      // Check for User
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      // If user doesn't exist create user profile
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate('/');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error('Error Logging In');
    }
  };

  //Facebook Sign In Method
  const fbLogin = async (e) => {
    setLoading(true);

    try {
      const auth = getAuth();

      const fbProvider = new FacebookAuthProvider();

      const result = await signInWithPopup(auth, fbProvider);

      const user = result.user;
      // Check for User
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      // If user doesn't exist create user profile
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate('/');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error('Error Logging In');
    }
  };

  //Twitter Sign In Method
  const twitterLogin = async (e) => {
    setLoading(true);

    try {
      const auth = getAuth();

      const twitterProvider = new TwitterAuthProvider();

      const result = await signInWithPopup(auth, twitterProvider);

      const user = result.user;
      // Check for User
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      // If user doesn't exist create user profile
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate('/');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error('Error Logging In');
    }
  };

  if (loading) {
    return <LineLoader />;
  }

  return (
    <div className="flex justify-center gap-12 py-6 flex-wrap">
      <motion.div
        whileHover={{ scale: 1.5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <SocialIcon
          onClick={twitterLogin}
          className="cursor-pointer"
          network="twitter"
          fgColor="#fff"
          style={{ height: 32, width: 32 }}
        />
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <Google
          onClick={googleLogin}
          className="cursor-pointer"
          style={{ height: 32, width: 32 }}
        />
      </motion.div>
      {/* <motion.div
        whileHover={{ scale: 1.5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <SocialIcon
          className="cursor-pointer"
          network="github"
          fgColor="#fff"
          style={{ height: 32, width: 32 }}
        />
      </motion.div> */}
      <motion.div
        whileHover={{ scale: 1.5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <SocialIcon
          onClick={fbLogin}
          className="cursor-pointer"
          network="facebook"
          fgColor="#fff"
          style={{ height: 32, width: 32 }}
        />
      </motion.div>
    </div>
  );
}

export default SocialLogin;
