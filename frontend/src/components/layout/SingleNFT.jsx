import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import LineLoader from '../LineLoader';
import { motion } from 'framer-motion';
import { getAuth } from 'firebase/auth';
import millify from 'millify';
import { FaDiscord, FaTwitter, FaEthereum, FaListAlt } from 'react-icons/fa';
import { MdDescription } from 'react-icons/md';
import {
  BsFillShareFill,
  BsEye,
  BsGlobe,
  BsClock,
  BsCartFill,
  BsFillTagFill,
} from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { AiOutlineHeart, AiFillTag } from 'react-icons/ai';
import { TfiMenuAlt } from 'react-icons/tfi';
import commaNumber from 'comma-number';
import { BiMenuAltLeft, BiDotsVerticalRounded } from 'react-icons/bi';
import { toast } from 'react-toastify';
function SingleNFT() {
  const [nft, setNft] = useState({});
  const [loading, setLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

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
    description,
    tokenID,
  } = nft;

  return (
    <>
      <div className="min-h-screen mx-auto py-4 lg:py-32">
        {/* <div className="grid grid-cols-3"> */}
        <div className="lg:container flex flex-row mx-auto">
          {/* LEFT */}
          <motion.div
            initial={{
              x: -1500,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              duration: 1,
            }}
            className="grow-0 px-5 shrink basis-2/5"
          >
            <div className=" min-w-fit flex flex-col gap-12">
              <img
                className="max-w-full max-h-full rounded-3xl"
                src={img}
                alt=""
              />
              <div className="overflow-hidden border-2 border-current/50 rounded-3xl">
                <div className="p-5 bg-base-100 border-b-2">
                  <div className="flex items-center gap-2">
                    <BiMenuAltLeft fontSize={24} strokeWidth={0.25} />
                    <p className="tracking-wide font-semibold text-lg">
                      Description
                    </p>
                  </div>
                </div>
                <div className="p-5 bg-base-content/5">
                  <div className="flex items-center gap-2 py-2">
                    <button className="tracking-wide font-medium text-lg">
                      By <span className="font-bold">{nftName}</span>
                    </button>
                    <GoVerified fontSize={12} className="text-blue-500" />
                  </div>
                </div>
                {/* About NFT */}
                <div className="collapse collapse-arrow overflow-hidden">
                  <input type="checkbox" />
                  <div className="collapse-title text-xl font-medium flex items-center gap-2 p-5 bg-base-100 border-b-2">
                    <MdDescription fontSize={24} />
                    <p className="tracking-wide font-semibold text-lg">
                      About {nftName}
                    </p>
                  </div>
                  <div className="collapse-content bg-base-content/5">
                    <div className="flex justify-center flex-col gap-3 py-5">
                      <p className="antialiased leading-relaxed indent-2">
                        {description ? description : 'No Description'}
                      </p>
                      {/* Socials Buttons Radio */}
                      <div className="btn-group justify-center">
                        <button className="ultrawide:px-10 place-content-center py-5 px-5 text-base-content/50 btn bg-base-100 border-0 border-l-2 border-y-2 border-base-content/20 hover:bg-base-100/50 hover:border-base-content/20 hover:shadow-md">
                          <BsGlobe fontSize={24} />
                        </button>
                        <button className="ultrawide:px-10 place-content-center py-5 px-5 text-base-content/50 btn bg-base-100 border-0 border-y-2 border-l-2 border-base-content/20 hover:bg-base-100/50 hover:border-base-content/20 hover:shadow-md">
                          <FaDiscord fontSize={24} />
                        </button>
                        <button className="ultrawide:px-10 place-content-center py-5 px-5 text-base-content/50 btn bg-base-100 border-0 border-y-2 border-l-2 border-base-content/20 hover:bg-base-100/50 hover:border-base-content/20 hover:shadow-md">
                          <FaTwitter fontSize={24} />
                        </button>
                        <button className="ultrawide:px-10 place-content-center py-5 px-5 text-base-content/50 btn bg-base-100 border-0 border-y-2 border-x-2 border-base-content/20 hover:bg-base-100/50 hover:border-base-content/20 hover:shadow-md">
                          <BiDotsVerticalRounded fontSize={24} />
                        </button>
                      </div>
                      {/* END OF SOCIALS */}
                    </div>
                  </div>
                </div>
                {/* About NFT */}
                <div className="collapse collapse-arrow overflow-hidden">
                  <input type="checkbox" />
                  <div className="collapse-title text-xl font-medium flex items-center gap-2 p-5 bg-base-100 border-b-2">
                    <FaListAlt fontSize={24} />
                    <p className="tracking-wide font-semibold text-lg">
                      Details
                    </p>
                  </div>
                  <div className="collapse-content bg-base-content/5">
                    <div className="flex justify-center flex-col gap-3 py-5">
                      {/* Contract Address */}
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Contract Address</p>
                        <button className="text-sm font-semibold text-primary hover:text-primary-focus">
                          {contract_address
                            ? `${contract_address.substr(0, 6)}...
                          ${contract_address.substr(
                            contract_address.length - 4
                          )}`
                            : 'No Address'}
                        </button>
                      </div>
                      {/* Token ID */}
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Token ID</p>
                        <button className="text-sm font-semibold text-primary hover:text-primary-focus">
                          {tokenID}
                        </button>
                      </div>
                      {/* Token Standard */}
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Token Standard</p>
                        <p className="text-sm font-semibold text-primary-content/60">
                          ERC-721
                        </p>
                      </div>
                      {/* Chain */}
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Chain</p>
                        <p className="text-sm font-semibold text-primary-content/60">
                          Ethereum
                        </p>
                      </div>
                      {/* Metadata */}
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Metadata</p>
                        <button
                          data-tip="Locked & Stored"
                          className="tooltip tooltip-left text-sm font-semibold text-primary hover:text-primary-focus"
                        >
                          Frozen
                        </button>
                      </div>
                      {/* Creator Fee */}
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Creator Fee</p>
                        <p className="text-sm font-semibold text-primary-content/60">
                          2.5%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{
              x: 1500,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              duration: 1,
              delay: 0.5,
            }}
            className="px-5 grow shrink-0 basis-3/5"
          >
            <div className=" min-w-fit flex flex-col gap-12">
              {/* NFT Name, Share, Website, Owner, Likes & Favs */}
              <div className="flex flex-col gap-6">
                {/* NFT Name, Share and Website */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 items-center relative">
                    <button
                      onMouseOut={handleMouseOut}
                      onMouseOver={handleMouseOver}
                      className="font-semibold text-lg text-primary"
                    >
                      {nftName}
                    </button>
                    <GoVerified fontSize={24} className="text-blue-500" />
                    {/* NFT CARD */}
                    <div
                      className={`transition-opacity duration-1000 ${
                        !isHovering
                          ? 'invisible opacity-0'
                          : 'visible opacity-100'
                      } card card-compact w-72 h-64 bg-base-100 shadow-xl absolute z-20 top-0 -left-8 translate-y-10`}
                    >
                      <figure>
                        <img height={50} src={img} alt={nftName} />
                      </figure>
                      <div className="card-body items-center">
                        <h2 className="card-title">
                          {nftName}
                          <GoVerified fontSize={24} className="text-blue-500" />
                        </h2>
                        <p className="text-center text-ellipsis overflow-hidden ... ...">
                          {description
                            ? `${description.substring(0, 100)}${
                                description.length >= 100 && '...'
                              }`
                            : 'OpenSea NFT'}
                        </p>
                      </div>
                    </div>
                    {/* END OF NFT CARD */}
                  </div>
                  <div className="flex gap-6">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        toast('Link Copied');
                      }}
                      data-tip="Copy Link"
                      className="tooltip active:scale-75 bg-base-100 p-3 h-12 w-12 rounded-full cursor-pointer hover:shadow-lg hover:transition-all hover:duration-200"
                    >
                      <BsFillShareFill
                        fontSize={24}
                        className="text-primary-content"
                      />
                    </button>
                    <a href={website} target="_blank" rel="noreferrer">
                      <div
                        data-tip="Website"
                        className="tooltip active:scale-75 bg-base-100 p-3 h-12 w-12 rounded-full cursor-pointer hover:shadow-lg hover:transition-all hover:duration-200"
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
                  <button className="font-semibold text-base">
                    Owned by{' '}
                    <span className="text-primary cursor-pointer transition-colors duration-500 hover:text-primary-focus">
                      {owner}
                    </span>
                  </button>
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
                    <button className="font-semibold text-base">
                      {favorites} favorites
                    </button>
                  </div>
                </div>
              </div>
              {/* Upload Date, Current Price & Buy */}
              <div className="overflow-hidden border-2 border-current/50 rounded-3xl">
                <div className="p-5 bg-base-100 border-b-2">
                  <div className="flex items-center gap-2">
                    <AiFillTag fontSize={24} strokeWidth={0.5} />

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

              {/* Collapse Offers */}
              <div className="collapse collapse-arrow overflow-hidden border-2 border-current/50 rounded-3xl">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium flex items-center gap-2 p-5 bg-base-100 border-b-2">
                  <AiFillTag fontSize={24} />
                  <p className="tracking-wide font-semibold text-lg">
                    Listings
                  </p>
                </div>
                <div className="collapse-content bg-base-content/5">
                  <div className="flex justify-center flex-col items-center gap-3">
                    <img
                      className="pt-5"
                      src="https://opensea.io/static/images/empty-asks.svg"
                      alt="Listing"
                    />
                    <p>No listings yet</p>
                  </div>
                </div>
              </div>

              {/* Collapse Offers */}
              <div className="collapse collapse-arrow overflow-hidden border-2 border-current/50 rounded-3xl">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium flex items-center gap-2 p-5 bg-base-100 border-b-2">
                  <TfiMenuAlt fontSize={24} />
                  <p className="tracking-wide font-semibold text-lg">Offers</p>
                </div>
                <div className="collapse-content bg-base-content/5">
                  <div className="flex justify-center flex-col items-center gap-3">
                    <img
                      className="pt-5"
                      src="https://opensea.io/static/images/empty-bids.svg"
                      alt="Listing"
                    />
                    <p>No Offers yet</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default SingleNFT;
