import { useState, useRef, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import LineLoader from '../LineLoader';
function CreateListing() {
  const [nftData, setNftData] = useState({
    chain: 'Ethereum',
    contract_address: '0x2953399124F0cBB46d2CbACD8A89cF0599974963',
    img: {},
    nftName: 'Hape Beast',
    owner: 'Name',
    price: 1,
    website: 'https://opensea.io/',
  });

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setNftData({ ...nftData, userRef: user.uid });
        } else {
          navigate('/login');
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line
  }, [isMounted]);
  return (
    <>
      <div className="min-h-screen">
        <h1>Create Listing</h1>
      </div>
    </>
  );
}

export default CreateListing;
