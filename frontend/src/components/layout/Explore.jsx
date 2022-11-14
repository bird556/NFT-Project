import Ape from '../../assets/jpeg/Ape.jpg';
import Fluff from '../../assets/mp4/fluff.mp4';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ReactComponent as Ethereum } from '../../assets/svg/eth.svg';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';
import LineLoader from '../LineLoader';
function Explore({ loading, exploreNFT }) {
  const navigate = useNavigate();

  const ref = useRef(null);
  const isInView = useInView(ref);

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
        staggerChildren: 0.5,
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

  console.log('explore nfts', exploreNFT);

  return (
    <div className="pb-4 transition-all duration-1000">
      <div>
        <h1 className="text-3xl font-medium  justify-center my-12 flex">
          Explore Our NFTs
        </h1>
        <div>
          {/* Buttons */}
          <div className="flex items-center gap-2 max-[640px]:hidden">
            <button className=" py-2 px-3 rounded-full btn-primary">
              All Categories
            </button>
            <button className=" py-2 px-3 rounded-full btn-ghost btn-outline">
              Fluff
            </button>
            <button className=" py-2 px-3 rounded-full btn-ghost btn-outline">
              Hape Beast
            </button>
            <button className=" py-2 px-3 rounded-full btn-ghost btn-outline">
              Sports
            </button>
          </div>
          {/* Filter */}
          <div className="dropdown dropdown-end flex justify-end min-[640px]:hidden">
            <label
              tabIndex={0}
              className="btn m-1 bg-primary text-primary-content"
            >
              Filter
            </label>
            <ul
              tabIndex={0}
              className="bg-base-100 dropdown-content menu p-2 shadow  rounded-box w-52"
            >
              <li>
                <a>All Categories</a>
              </li>
              <li>
                <a>Fluff</a>
              </li>
              <li>
                <a>Hape Beast</a>
              </li>
              <li>
                <a>Sports</a>
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
                    <div className=" z-40 flex flex-col justify-center items-center w-72 self-center p- bg-primary/10 rounded-3xl shadow-2xl shadow-violet-300/25">
                      <div className="mt-3 p-4 flex gap-2 flex-col justify-end h-64 w-64 overflow-hidden relative rounded-lg">
                        <img
                          src={nftData.img}
                          alt={nftData.nftName}
                          className="pointer-events-none  scale-125  opacity-100 translate-y-3 z-10"
                        />
                        {/* <video
                        src={Fluff}
                        autoPlay
                        muted
                        loop
                        alt="NFT"
                        className="pointer-events-none  scale-125 absolute translate-y-3"
                      /> */}
                      </div>

                      <div className="self-start p-4 flex flex-col gap-2 w-full">
                        <div className="flex flex-col gap-4">
                          <p className="z-40 bottom-0s tracking-wider font-medium">
                            {nftData.nftName}
                          </p>
                          <div className="flex gap-2 items-center">
                            <img
                              className="rounded-full w-8 z-40"
                              src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80"
                              alt=""
                            />
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
          {/* Single NFT */}
          <motion.div variants={item} className="mt-12">
            <div className=" z-40 flex flex-col justify-center items-center w-72 self-center p- bg-primary/10 rounded-3xl shadow-2xl shadow-violet-300/25">
              <div className="mt-3 p-4 flex gap-2 flex-col justify-end h-64 w-64 overflow-hidden relative rounded-lg">
                <img
                  src={Ape}
                  alt="NFT"
                  className="pointer-events-none  scale-125  opacity-100 translate-y-3 z-10"
                />
                {/* <video
                        src={Fluff}
                        autoPlay
                        muted
                        loop
                        alt="NFT"
                        className="pointer-events-none  scale-125 absolute translate-y-3"
                      /> */}
              </div>

              <div className="self-start p-4 flex flex-col gap-2 w-full">
                <div className="flex flex-col gap-4">
                  <p className="z-40 bottom-0s tracking-wider font-medium">
                    Hape Beast
                  </p>
                  <div className="flex gap-2 items-center">
                    <img
                      className="rounded-full w-8 z-40"
                      src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80"
                      alt=""
                    />
                    <p className="z-40 text-sm font-thin tracking-wider">
                      Jane Cooper
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-between">
                  <div className="flex items-center">
                    <Ethereum className="fill-primary w-6" />
                    <p className="">
                      18.79 <span>ETH</span>
                    </p>
                  </div>
                  <div>
                    <button className="btn btn-xs">Place a Bid</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          {/* Single NFT */}
          <motion.div variants={item} className="mt-12">
            <div className=" z-40 flex flex-col justify-center items-center w-72 self-center p- bg-primary/10 rounded-3xl shadow-2xl shadow-violet-300/25">
              <div className="mt-3 p-4 flex gap-2 flex-col justify-end h-64 w-64 overflow-hidden relative rounded-lg">
                {/* <img
                  src={Ape}
                  alt="NFT"
                  className="pointer-events-none  scale-125  opacity-100 translate-y-3 z-10"
                /> */}
                <video
                  src={Fluff}
                  autoPlay
                  muted
                  loop
                  alt="NFT"
                  className="pointer-events-none  scale-125 absolute translate-y-3"
                />
              </div>

              <div className="self-start p-4 flex flex-col gap-2 w-full">
                <div className="flex flex-col gap-4">
                  <p className="z-40 bottom-0s tracking-wider font-medium">
                    Hape Beast
                  </p>
                  <div className="flex gap-2 items-center">
                    <img
                      className="rounded-full w-8 z-40"
                      src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80"
                      alt=""
                    />
                    <p className="z-40 text-sm font-thin tracking-wider">
                      Jane Cooper
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-between">
                  <div className="flex items-center">
                    <Ethereum className="fill-primary w-6" />
                    <p className="">
                      18.79 <span>ETH</span>
                    </p>
                  </div>
                  <div>
                    <button className="btn btn-xs">Place a Bid</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          {/* Single NFT */}
          <motion.div variants={item} className="mt-12">
            <div className=" z-40 flex flex-col justify-center items-center w-72 self-center p- bg-primary/10 rounded-3xl shadow-2xl shadow-violet-300/25">
              <div className="mt-3 p-4 flex gap-2 flex-col justify-end h-64 w-64 overflow-hidden relative rounded-lg">
                <img
                  src={Ape}
                  alt="NFT"
                  className="pointer-events-none  scale-125  opacity-100 translate-y-3 z-10"
                />
                {/* <video
                        src={Fluff}
                        autoPlay
                        muted
                        loop
                        alt="NFT"
                        className="pointer-events-none  scale-125 absolute translate-y-3"
                      /> */}
              </div>

              <div className="self-start p-4 flex flex-col gap-2 w-full">
                <div className="flex flex-col gap-4">
                  <p className="z-40 bottom-0s tracking-wider font-medium">
                    Hape Beast
                  </p>
                  <div className="flex gap-2 items-center">
                    <img
                      className="rounded-full w-8 z-40"
                      src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80"
                      alt=""
                    />
                    <p className="z-40 text-sm font-thin tracking-wider">
                      Jane Cooper
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-between">
                  <div className="flex items-center">
                    <Ethereum className="fill-primary w-6" />
                    <p className="">
                      18.79 <span>ETH</span>
                    </p>
                  </div>
                  <div>
                    <button className="btn btn-xs">Place a Bid</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Explore;
