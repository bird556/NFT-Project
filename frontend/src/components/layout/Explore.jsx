import { motion } from 'framer-motion';
import { ReactComponent as Ethereum } from '../../assets/svg/eth.svg';
import { useNavigate } from 'react-router-dom';
import LineLoader from '../LineLoader';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

function Explore({ loading, exploreNFT }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  const navigate = useNavigate();
  console.log(menuOpen);
  const imageAnimate = {
    offscreen: { x: 500, opacity: 0 },
    onscreen: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        staggerDirection: -1,
        staggerChildren: 1,
      },
    },
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        staggerDirection: 1,
      },
    },
  };

  const item = {
    hidden: { x: 500, opacity: 0 },
    show: { x: 0, opacity: 1 },
  };

  if (loading) {
    return <LineLoader />;
  }

  return (
    <div inView={inView}>
      <div className="pb-4 transition-all duration-1000">
        <div>
          <h1 className="text-3xl font-medium  justify-center my-12 flex max-[290px]:text-2xl">
            Explore Our NFTs
          </h1>
          <div ref={ref}>
            {/* Buttons */}
            <div className="flex items-center gap-2 max-[640px]:hidden">
              <button className=" py-2 px-3 rounded-full btn-primary text-white">
                All Categories
              </button>
              <button className=" py-2 px-3 rounded-full btn-ghost btn-outline cursor-not-allowed">
                Fluff
              </button>
              <button className=" py-2 px-3 rounded-full btn-ghost btn-outline cursor-not-allowed">
                Hape Beast
              </button>
              <button className=" py-2 px-3 rounded-full btn-ghost btn-outline cursor-not-allowed">
                Bored Ape Yacht Club
              </button>
            </div>
            {/* Filter */}
            <div
              onClick={() => setMenuOpen((prevState) => !prevState)}
              className={`dropdown ${
                menuOpen ? 'dropdown-open' : ' '
              } flex justify-end min-[640px]:hidden max-[290px]:hidden`}
            >
              <label className="btn m-1 bg-primary text-white">Filter</label>
              <ul className="bg-base-100 dropdown-content menu p-2 shadow  rounded-box w-52">
                <li>
                  <a>All Categories</a>
                </li>
                <li className="cursor-not-allowed">
                  <a className="text-sm">Fluff</a>
                </li>
                <li className="cursor-not-allowed">
                  <a className="text-sm">Hape Beast</a>
                </li>
                <li className="cursor-not-allowed">
                  <a className="text-sm">Bored Ape Yacht Club</a>
                </li>
              </ul>
            </div>
          </div>
          {/* NFTS */}
          <motion.div
            initial={'hidden'}
            whileInView={'show'}
            viewport={{ once: true, amount: 0.1 }}
            variants={container}
            className="grid gap-y-12 place-items-center justify-center min-[1160px]:grid-cols-3 min-[1560px]:grid-cols-4 min-[700px]:grid-cols-2"
          >
            {exploreNFT
              ? exploreNFT.map((data) => {
                  const nftData = data.data;
                  return (
                    <motion.div variants={item} className="mt-12">
                      <div className="z-40 flex flex-col justify-center items-center w-72 self-center p- bg-primary/10 rounded-3xl shadow-2xl shadow-violet-300/25 max-[290px]:w-64">
                        <div
                          onClick={() => navigate(`/nft/${data.id}`)}
                          className=" cursor-pointer mt-3 p-4 flex gap-2 flex-col justify-end h-64 w-64 overflow-hidden relative rounded-lg"
                        >
                          <img
                            src={nftData.img}
                            alt={nftData.nftName}
                            className="pointer-events-none scale-125  opacity-100 translate-y-3 z-10 max-[290px]:scale-110 max-[290px]:rounded-xl max-[290px]:translate-y-0"
                          />
                        </div>

                        <div className="self-start p-4 flex flex-col gap-2 w-full">
                          <div className="flex flex-col gap-4">
                            <p className="z-40 bottom-0s tracking-wider font-medium">
                              {nftData.nftName}
                            </p>
                            <div className="flex gap-2 items-center">
                              <div className="bg-blue-300 w-8 h-8 rounded-full overflow-hidden">
                                <img
                                  className="w-8 z-40"
                                  src={
                                    nftData.ownerImageUrls
                                      ? nftData.ownerImageUrls
                                      : 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80'
                                  }
                                  alt={nftData.owner ? nftData.owner : 'user'}
                                />
                              </div>

                              <p className="z-40 text-sm font-thin tracking-wider">
                                {nftData.owner}{' '}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 justify-between">
                            <div className="flex items-center">
                              <Ethereum className="fill-primary w-6" />
                              <p className="ml-2">
                                {nftData.price} <span>ETH</span>
                              </p>
                            </div>
                            <div>
                              <button
                                onClick={() => navigate(`/nft/${data.id}`)}
                                className="btn btn-xs"
                              >
                                Place a Bid
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              : null}
          </motion.div>
        </div>
      </div>
      <div
        className={`transition-opacity duration-1000
      ${
        !inView
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100 pointer-events-auto'
      }
      `}
      ></div>
    </div>
  );
}

export default Explore;
