import Navbar from './components/layout/Navbar';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import StickyHeadroom from '@integreat-app/react-sticky-headroom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from 'react-router-dom';
import Home from './components/layout/Home';
import Login from './components/layout/Login';
import CopyRightFooter from './components/layout/CopyRightFooter';
import SignUp from './components/layout/SignUp';
import { Particles } from 'react-animation-particles';
import config from './assets/particles.config.json';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './components/layout/ForgotPassword';
import { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from './firebase.config';
import SingleNFT from './components/layout/SingleNFT';
import CreateListing from './components/layout/CreateListing';
import { useInView } from 'react-intersection-observer';
import ThemeIcon from './components/ThemeIcon';
import UseScrollToTop from './hooks/useScrollToTop';
function App() {
  const [loading, setLoading] = useState(true);
  const [particles, setParticles] = useState(false);
  const [nfts, setNfts] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [userNFTCreator, setUserNFTCreator] = useState(null);
  const [theme, setTheme] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const { scrollYProgress } = useScroll();

  const params = useParams();

  const handleTheme = () => setTheme((prevstate) => !prevstate);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const nftRef = collection(db, 'nfts');
        const nftCreatorRef = collection(db, 'users');
        const q = query(
          nftRef,
          where('chain', '==', 'Ethereum'),
          orderBy('timestamp', 'desc'),
          limit(8)
        );
        const qNFTRevenue = query(
          nftCreatorRef,
          orderBy('revenue', 'desc'),
          limit(8)
        );
        const querySnap = await getDocs(q);
        const querySnapRevenue = await getDocs(qNFTRevenue);

        const nfts = [];
        const userNFTCreator = [];
        const nftRevenue = [];

        querySnap.forEach((doc) => {
          return nfts.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        querySnapRevenue.forEach((doc) => {
          return nftRevenue.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setNfts(nfts);
        setRevenue(nftRevenue);
        setLoading(false);
        setParticles(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNFTs();
  }, []);

  return (
    <>
      <AnimatePresence>
        <div
          inView={inView}
          data-theme={!theme ? 'mytheme' : 'mylighttheme'}
          className="transition-all duration-1000 overflow-x-hidden relative !px-8 min-h-screen flex flex-col justify-between content-between caret-transparent lg:!px-32 max-[290px]:!px-2"
        >
          {particles ? <Particles config={config} /> : null}
          <motion.div
            className="progress-bar bg-current"
            style={{ scaleX: scrollYProgress }}
          />
          <div className="relative z-50">
            <Router>
              <StickyHeadroom scrollHeight={100} zIndex={100}>
                <Navbar scrollPosition={scrollPosition} />
              </StickyHeadroom>
              <UseScrollToTop />
              <Routes>
                <Route
                  path="/"
                  element={
                    <div ref={ref}>
                      <Home
                        loading={loading}
                        exploreNFT={nfts}
                        revenue={revenue}
                      />
                    </div>
                  }
                />
                <Route
                  path="/login"
                  element={<Login handleTheme={handleTheme} theme={theme} />}
                />
                <Route path="/nft/:nftName" element={<SingleNFT />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route
                  path="/signup"
                  element={<SignUp handleTheme={handleTheme} />}
                />
                <Route path="/dashboard" element={<PrivateRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route path="/create-nft" element={<PrivateRoute />}>
                  <Route path="/create-nft" element={<CreateListing />} />
                </Route>
              </Routes>
              <CopyRightFooter loading={loading} />
            </Router>

            <ThemeIcon handleTheme={handleTheme} theme={theme} />
            <ToastContainer
              position="top-right"
              autoClose={1000}
              limit={1}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </div>
        </div>
      </AnimatePresence>
    </>
  );
}

export default App;
