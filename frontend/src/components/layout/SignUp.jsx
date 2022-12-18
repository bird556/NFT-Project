import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SocialLogin from './SocialLogin';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { db } from '../../firebase.config';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import hapeBeast from '../../assets/jpeg/hape.jpg';
import { motion } from 'framer-motion';
import ThemeIcon from '../ThemeIcon';
function SignUp({ handleTheme }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const { email, password, firstName, lastName } = formData;

  const onChange = (e) => {
    setFormData((prevstate) => ({
      ...prevstate,
      [e.target.id]: e.target.value,
    }));
  };
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(e);

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: firstName,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <motion.div
        className="hero min-h-[90vh]"
        initial={{
          x: -1500,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          delay: 0.5,
          duration: 0.5,
          ease: 'easeInOut',
        }}
      >
        <div className="hero-content p-0 card block shadow-2xl">
          <div className="flex items-center bg-base-100 rounded-lg overflow-hidden">
            <form onSubmit={onSubmit} className="px-24 max-[1410px]:px-0">
              <div className="text-center p-6">
                <h1 className="text-3xl font-bold">Create New Account</h1>
              </div>
              <div className="card-body w-96 min-w-full max-[460px]:w-full">
                <div className="flex items-center gap-6 justify-between">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">First</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="First"
                        className="input input-bordered w-full"
                        id="firstName"
                        value={firstName}
                        onChange={onChange}
                      />
                      <BsFillPersonLinesFill className="absolute top-0 right-3 translate-y-full pointer-events-none" />
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Last</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Last"
                        className="input input-bordered w-full"
                        id="lastName"
                        value={lastName}
                        onChange={onChange}
                      />
                      <BsFillPersonLinesFill className="absolute top-0 right-3 translate-y-full pointer-events-none" />
                    </div>
                  </div>
                </div>

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
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="password"
                      className="input input-bordered w-full"
                      id="password"
                      value={password}
                      onChange={onChange}
                    />
                    <button
                      onClick={() => setShowPassword((prevstate) => !prevstate)}
                    >
                      {!showPassword ? (
                        <motion.div
                          className="absolute top-0 right-3"
                          whileHover={{ scale: 1.1 }}
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          <AiFillEye className="translate-y-full cursor-pointer pointer-events-auto" />
                        </motion.div>
                      ) : (
                        <motion.div
                          className="absolute top-0 right-3"
                          whileHover={{ scale: 1.1 }}
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          <AiFillEyeInvisible className="translate-y-full cursor-pointer pointer-events-auto" />
                        </motion.div>
                      )}
                    </button>
                  </div>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary text-white">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      Sign Up
                    </motion.div>
                  </button>
                  <p className="text-center pt-6 pointer-events-none">
                    Sign Up With
                  </p>
                  <SocialLogin />
                  <p className="text-center">
                    Already A Member ?
                    <button
                      onClick={() => navigate('/login')}
                      className="text-primary pl-2 hover:text-primary-focus"
                    >
                      Log In
                    </button>
                  </p>
                </div>
              </div>
            </form>
            <img className="max-[1410px]:hidden" src={hapeBeast} alt="" />
          </div>
        </div>
      </motion.div>
      {/* <ThemeIcon handleTheme={handleTheme} /> */}
    </>
  );
}

export default SignUp;
