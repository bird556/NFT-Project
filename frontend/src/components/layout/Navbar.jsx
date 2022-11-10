import { useNavigate } from 'react-router-dom';
import { useAuthStatus } from '../../hooks/useAuthStatus';
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Man from '../../assets/png/man1.png';
function Navbar() {
  const navigate = useNavigate();

  const auth = getAuth();

  const { loggedIn, checkingStatus } = useAuthStatus();

  const [menu, setMenu] = useState(false);

  const onLogOut = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      toast('Logged Out');
      navigate('/');
    } catch (error) {}
  };

  if (auth.currentUser == null) {
    console.log(`It is null`);
  }

  return (
    <>
      <div className="navbar bg-base-100 justify-between">
        <div className="navbar-start lg:hidden">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
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
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
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
            className="btn btn-ghost normal-case text-xl"
          >
            crypt
          </button>
          <ul className="items-center gap-8 hidden  text-base  font-medium lg:flex">
            <li>
              <a className="cursor-pointer">Creators</a>
            </li>
            <li>
              <a className="cursor-pointer">Explore</a>
            </li>
            <li className="cursor-pointer">NFT Collection</li>
          </ul>
        </div>
        <div className="navbar-end">
          {!auth.currentUser ? (
            <button onClick={() => navigate('/login')} className="btn btn-sm">
              Login
            </button>
          ) : null}

          {auth.currentUser ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={Man} alt={auth.currentUser.displayName} />
                </div>
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
                <li>
                  <a>Settings</a>
                </li>
                <li onClick={onLogOut}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
      <div className="divider mt-0"></div>
    </>
  );
}

export default Navbar;
