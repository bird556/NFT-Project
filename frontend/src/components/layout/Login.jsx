import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SocialLogin from './SocialLogin';
import hapeBeast from '../../assets/jpeg/hape.jpg';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import LineLoader from '../LineLoader';
import ThemeIcon from '../ThemeIcon';
function Login({ handleTheme, theme }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevstate) => ({
      ...prevstate,
      [e.target.id]: e.target.value,
    }));
  };
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        toast.success('Successful...welcome back 😌');
        setLoading(false);
        navigate('/');
      }
    } catch (error) {
      setLoading(false);
      toast('Login Failed ❌');
    }
  };

  if (loading) {
    return <LineLoader />;
  }

  return (
    <>
      <motion.div
        className="hero min-h-[90vh]"
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
        <div className="hero-content card shadow-2xl transition-all duration-1000">
          <div className="flex items-center bg-base-100 rounded-lg overflow-hidden">
            <form onSubmit={onSubmit} className="px-24 max-[1410px]:px-0">
              <div className="text-center p-6">
                <h1 className="text-4xl font-bold">Login</h1>
              </div>
              <div className="card-body w-96 min-w-full max-[460px]:w-full">
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

                  <label className="label">
                    <button
                      onClick={() => navigate('/forgotpassword')}
                      className="label-text-alt link link-hover"
                    >
                      Forgot password?
                    </button>
                  </label>
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
                      Login
                    </motion.div>
                  </button>
                  <p className="text-center pt-6 pointer-events-none">
                    Login With
                  </p>
                  {/* Social Login */}
                  <SocialLogin />
                  {/* <h1 className="py-6 text-center">Or</h1> */}
                  <p className="text-center">
                    Not A Member ?
                    <button
                      onClick={() => navigate('/signup')}
                      className="text-primary pl-2 hover:text-primary-focus"
                    >
                      Create Account
                    </button>
                  </p>
                </div>
              </div>
            </form>
            <img className="max-[1410px]:hidden" src={hapeBeast} alt="" />
          </div>
        </div>
      </motion.div>
      {/* <ThemeIcon handleTheme={handleTheme} theme={theme} /> */}
    </>
  );
}

export default Login;
