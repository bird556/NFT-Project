import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import LineLoader from '../LineLoader';
import { motion } from 'framer-motion';
import { getAuth } from 'firebase/auth';
import millify from 'millify';
import {
  BsFillShareFill,
  BsEye,
  BsHeart,
  BsGlobe,
  BsClock,
  BsCartFill,
  BsFillTagFill,
} from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { AiOutlineHeart } from 'react-icons/ai';
import commaNumber from 'comma-number';
function SingleNFT() {
  const [nft, setNft] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchNfts = async () => {
      const docRef = doc(db, 'nfts', params.nftName);
      const docSnap = await getDoc(docRef);
      setLoading(true);

      if (docSnap.exists()) {
        setNft(docSnap.data());
        setLoading(false);
      }
    };

    fetchNfts();
  }, [navigate, params.nftName]);

  if (loading) {
    return <LineLoader />;
  }

  const {
    contract_address,
    img,
    nftName,
    owner,
    ownerImageUrls,
    price,
    website,
    timestamp,
    views,
    favorites,
  } = nft;

  const d = new Date();

  return (
    <>
      <div className="min-h-screen  mx-auto py-4 lg:py-32">
        {/* <div className="grid grid-cols-3"> */}
        <div className="lg:container flex flex-row mx-auto">
          {/* LEFT */}
          <div className="grow-0 px-5 shrink basis-2/5">
            <img
              className="max-w-full max-h-full rounded-3xl"
              src={img}
              alt=""
            />
          </div>
          {/* RIGHT */}
          <div className="px-5 grow shrink-0 basis-3/5">
            <div className=" min-w-fit flex flex-col gap-12">
              {/* NFT Name, Share, Website, Owner, Likes & Favs */}
              <div className="flex flex-col gap-6">
                {/* NFT Name, Share and Website */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <h1 className="font-semibold text-lg text-primary">
                      {nftName}
                    </h1>
                    <GoVerified fontSize={24} className="text-blue-500" />
                  </div>
                  <div className="flex gap-6">
                    <div
                      data-tip="Copy Link"
                      className="tooltip bg-base-100 p-3 h-12 w-12 rounded-full cursor-pointer hover:shadow-lg hover:transition-all hover:duration-1000"
                    >
                      <BsFillShareFill
                        fontSize={24}
                        className="text-primary-content"
                      />
                    </div>
                    <a href={website} target="_blank" rel="noreferrer">
                      <div
                        data-tip="Website"
                        className="tooltip bg-base-100 p-3 h-12 w-12 rounded-full cursor-pointer hover:shadow-lg hover:transition-all hover:duration-1000"
                      >
                        <BsGlobe
                          fontSize={24}
                          className="text-primary-content"
                        />
                      </div>
                    </a>
                  </div>
                </div>
                <div>
                  {/* Owner */}
                  <h1 className="font-semibold text-base">
                    Owned by{' '}
                    <span className="text-primary cursor-pointer transition-colors duration-500 hover:text-primary-focus">
                      {owner}
                    </span>
                  </h1>
                </div>
                {/* Views & Likes */}
                <div className="flex items-center gap-6">
                  <div
                    data-tip={`${commaNumber(views)} views`}
                    className="tooltip flex items-center gap-2"
                  >
                    <BsEye fontSize={24} strokeWidth={0.5} />
                    <h1 className="font-semibold text-base">
                      {millify(views)} views
                    </h1>
                  </div>

                  <div className="flex items-center gap-2 cursor-pointer transition-colors duration-500 hover:text-primary-focus">
                    <AiOutlineHeart fontSize={24} />
                    <h1 className="font-semibold text-base">
                      {favorites} favorites
                    </h1>
                  </div>
                </div>
              </div>
              {/* Upload Date, Current Price & Buy */}
              <div className="overflow-hidden border-2 border-current/50 rounded-3xl">
                <div className="p-5 bg-base-100 border-b-2">
                  <div className="flex items-center gap-2">
                    <BsClock fontSize={24} strokeWidth={0.5} />

                    <p className="tracking-wide font-medium">
                      Uploaded{' '}
                      {new Date(timestamp.seconds * 1000).toLocaleString(
                        'en-US'
                      )}
                    </p>
                  </div>
                </div>
                <div className="p-5 bg-base-content/5">
                  <div className="flex flex-col gap-3">
                    <p className="tracking-wide font-medium">Current Price</p>
                    <h1 className="text-3xl font-bold">{price} ETH</h1>
                    <div className="flex items-center w-full  justify-between max-[1475px]:flex-col gap-y-3">
                      <button className="btn btn-lg gap-2 btn-block max-w-xs max-[1475px]:max-w-full">
                        <BsCartFill fontSize={24} strokeWidth={0.5} />
                        Buy Now
                      </button>
                      <button className="btn btn-lg gap-2 btn-block max-w-xs max-[1475px]:max-w-full">
                        <BsFillTagFill fontSize={24} strokeWidth={0.5} />
                        Make Offer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="max-w-7xl  flex max-[1250px]:flex-col">
          {/* Smaller Screen Name on Top */}
        {/* <div className=" flex-col gap-6 w-full hidden  max-[1250px]:flex">
          <div className="flex justify-between">
            <h1 className="font-bold text-lg text-primary">{nftName}</h1>
            <div>
              <BsFillShareFill fontSize={24} />
            </div>
          </div>
          <h1 className="font-semibold text-lg">
            Owned by{' '}
            <span className="text-primary cursor-pointer transition-colors duration-500 hover:text-primary-focus">
              {owner}
            </span>
          </h1>
        </div>
        <div className="max-w-xl">
          <img className="rounded-3xl w-full" src={img} alt={nftName} />
        </div>
        <div className="p-5 shrink-0">
          <div className=" flex-col gap-6 max-[1250px]:hidden">
            <div className="flex justify-between">
              <h1 className="font-bold text-lg text-primary">{nftName}</h1>
              <div>
                <BsFillShareFill fontSize={24} className="mr-6" />
              </div>
            </div>
            <h1 className="font-semibold text-lg">
              Owned by{' '}
              <span className="text-primary cursor-pointer transition-colors duration-500 hover:text-primary-focus">
                {owner}
              </span>
            </h1>
          </div>
        </div> */}
        {/* </div> */}
      </div>
    </>
  );
}

export default SingleNFT;
