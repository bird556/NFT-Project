import { useNavigate } from 'react-router-dom';
import { useAuthStatus } from '../../hooks/useAuthStatus';
import {
  getAuth,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { useState, useEffect, useRef } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { CgProfile } from 'react-icons/cg';
import { db } from '../../firebase.config';
function Navbar({ scrollPosition }) {
  const navigate = useNavigate();
  const auth = getAuth();
  const { loggedIn, checkingStatus } = useAuthStatus();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  console.log(auth);
  const isMounted = useRef(true);
  const onLogOut = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      toast('Logged Out');
      navigate('/');
    } catch (error) {}
  };
  // console.log(userInfo.name);
  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const fetchUsers = async () => {
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            // setImg(docSnap.data().userImage[0]);
            setUserInfo(docSnap.data());
            // console.log(docSnap.data());
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
        <div className="navbar-start lg:hidden">
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
              <li onClick={document.activeElement.blur()}>
                <a>Creators</a>
              </li>
              <li>
                <a>Explore</a>
              </li>
              <li>
                <a>NFT Collection</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center lg:gap-12 sm:gap-0">
          <button
            onClick={() => navigate('/')}
            className="transition-all duration-500  font-semibold normal-case text-xl hover:text-primary-focus"
          >
            Crypt Keeper NFTs
          </button>
          <ul className="items-center gap-8 hidden text-accent font-medium lg:flex">
            <li>
              <a className="cursor-pointer transition-colors duration-700 hover:text-primary-content">
                Creators
              </a>
            </li>
            <li>
              <a className="cursor-pointer transition-colors duration-700 hover:text-primary-content">
                Explore
              </a>
            </li>
            <li className="cursor-pointer transition-colors duration-700 hover:text-primary-content">
              Collection
            </li>
          </ul>
        </div>
        <div className="navbar-end">
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
                {!userInfo.userImage[0] ? (
                  <CgProfile fontSize={32} />
                ) : (
                  <div className="w-10 rounded-full">
                    <img
                      src={userInfo.userImage[0]}
                      height={32}
                      width={32}
                      alt={auth.currentUser.displayName}
                    />
                  </div>
                )}
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
