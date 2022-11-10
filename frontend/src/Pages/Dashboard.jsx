import { useState, useEffect } from 'react';
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);

  if (auth.currentUser) {
    return (
      <div className="min-h-screen">
        <h1 className="text-white text-2xl">
          Welcome Back, {auth.currentUser.displayName}
        </h1>
        <h1 className="text-white text-lg">{auth.currentUser.email}</h1>
      </div>
    );
  }

  return <div>Dashboard</div>;
}

export default Dashboard;
