import { useState, useRef, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import LineLoader from '../LineLoader';
import { motion } from 'framer-motion';
function CreateListing() {
  const [loading, setLoading] = useState(false);
  const [nftData, setNftData] = useState({
    chain: 'Ethereum',
    contract_address: '0x2953399124F0cBB46d2CbACD8A89cF0599974963',
    img: {},
    nftName: 'Hape Beast',
    price: 1,
    website: 'https://opensea.io/',
  });

  const { nftName, price, website, img } = nftData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        console.log(user);
        if (user) {
          setNftData({
            ...nftData,
            userRef: user.uid,
            owner: user.displayName,
          });
        } else {
          navigate('/login');
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

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
          <div className="flex flex-col items-center bg-base-100 rounded-lg overflow-hidden">
            <form onSubmit={onSubmit}>
              <div className="text-center p-12">
                <h1 className="text-4xl font-bold">Upload NFT</h1>
              </div>
              <div className="flex flex-col items-center gap-6">
                <select className="select select-bordered w-full max-w-xs">
                  <option disabled selected>
                    NFT Name
                  </option>
                  <option>Hape Beast</option>
                  <option>Bored Ape Yacht Club</option>
                  <option>Fluf</option>
                </select>
                <input
                  type="number"
                  placeholder="ETH"
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="Website"
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs"
                />
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default CreateListing;
