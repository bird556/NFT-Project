import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SocialLogin from './SocialLogin';
// import OAuth from '../components/OAuth';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

function ForgotPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const auth = getAuth();

  const onChange = (e) => setEmail(e.target.value);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password Reset..check Email 📨');
      setEmail('');
    } catch (error) {
      toast.error('Error');
    }
  };

  return (
    <>
      <motion.div
        className="hero min-h-screen"
        initial={{
          x: 1500,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
        }}
      >
        <div className="hero-content block ">
          <div className="text-center pb-6">
            <h1 className="text-5xl font-bold">Forgot Password</h1>
          </div>
          <form
            onSubmit={onSubmit}
            className="card flex-shrink-0 w-full max-w-sm shadow-2xl"
          >
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered w-full"
                    id="email"
                    value={email}
                    onChange={onChange}
                  />
                  <MdEmail className="absolute top-0 right-3 translate-y-full pointer-events-none" />
                </div>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary text-white">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    Send Reset Link
                  </motion.div>
                </button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
}

export default ForgotPassword;
