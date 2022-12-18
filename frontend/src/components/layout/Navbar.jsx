import { useNavigate } from 'react-router-dom';
import { useAuthStatus } from '../../hooks/useAuthStatus';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useState, useEffect, useRef } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { CgProfile } from 'react-icons/cg';
import { db } from '../../firebase.config';
function Navbar() {
  const navigate = useNavigate();
  const auth = getAuth();
  const { loggedIn, checkingStatus } = useAuthStatus();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const isMounted = useRef(true);
  const onLogOut = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      toast('Logged Out');
      navigate('/');
    } catch (error) {}
  };
  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const fetchUsers = async () => {
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            setUserInfo(docSnap.data());
          };
          fetchUsers();
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  return (
    <div
      onMouseLeave={() => {
        setProfileMenu(false);
        setMenuOpen(false);
      }}
      className="transition-all duration-1000 bg-base-100 z-50"
    >
      <div className="navbar justify-between mb-1">
        <div className="navbar-start lg:hidden max-[430px]:!absolute max-[430px]:left-0">
          <div
            onClick={() => setMenuOpen((prevState) => !prevState)}
            className={`dropdown ${menuOpen ? 'dropdown-open' : ' '}`}
          >
            <label className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li className="hidden max-[430px]:block">
                {!auth.currentUser ? (
                  <button onClick={() => navigate('/login')}>Login</button>
                ) : null}
              </li>
              <li onClick={document.activeElement.blur()}>
                <a>Creators</a>
              </li>
              <li>
                <a>Explore</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center lg:gap-12 sm:gap-0 max-[430px]:text-center max-[430px]:justify-center max-[430px]:w-full">
          <button
            onClick={() => navigate('/')}
            className="transition-all duration-500  font-semibold normal-case text-xl hover:text-primary-focus max-[290px]:text-lg"
          >
            Crypt Keeper NFTs
          </button>
        </div>
        <div className="navbar-end max-[430px]:hidden">
          {!auth.currentUser ? (
            <button onClick={() => navigate('/login')} className="btn btn-sm">
              Login
            </button>
          ) : null}

          {auth.currentUser ? (
            <div
              onClick={() => setProfileMenu((prevState) => !prevState)}
              className={`dropdown dropdown-end ${
                profileMenu ? 'dropdown-open' : ' '
              }`}
            >
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <CgProfile fontSize={32} />
              </label>
              <ul
                tabIndex={0}
                className={`menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52`}
              >
                <li onClick={() => navigate('/dashboard')}>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li onClick={() => navigate('/create-nft')}>
                  <a className="justify-between">Upload NFT</a>
                </li>
                <li onClick={onLogOut}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
      <div className="divider mt-0 h-0"></div>
    </div>
  );
}

export default Navbar;
