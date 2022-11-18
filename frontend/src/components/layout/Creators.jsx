import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Ape from '../../assets/jpeg/Ape.jpg';
import Fluff from '../../assets/mp4/fluff.mp4';
import BestCreators from './BestCreators';
function Creators() {
  const navigate = useNavigate();
  return (
    <>
      <motion.div
        initial={{
          y: 1500,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1,
        }}
        className=""
      >
        <div className="py-4 lg:py-32 ">
          <div className="transition-all duration-1000">
            <div className="flex flex-col-reverse lg:flex-row lg:items-center justify-center gap-12 lg:gap-24">
              <div className="lg:max-w-md flex flex-col gap-16 items-center lg:items-start">
                <div className="flex flex-col items-center lg:items-start">
                  <h1 className="text-4xl text-center lg:text-5xl lg:text-left font-medium leading-tight tracking-wider">
                    Create and sell your Rare NFTs Collection
                  </h1>
                  <p className="py-6 text-gray-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Animi, quasi at facilis beatae perferendi.
                  </p>
                  <div>
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="btn btn-primary text-white"
                    >
                      Explore Now
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap max-w-md w-96  lg:gap-16 lg:w-auto justify-between">
                  <div>
                    <p className="text-3xl  mb-2 font-semibold">12k</p>
                    <p className="text-gray-400 text-sm">Collectibles</p>
                  </div>
                  <div>
                    <p className="text-3xl  mb-2 font-semibold">36k</p>
                    <p className="text-gray-400 text-sm">Auctions</p>
                  </div>
                  <div>
                    <p className="text-3xl  mb-2 font-semibold">57k</p>
                    <p className="text-gray-400 text-sm">NFT Artist</p>
                  </div>
                </div>
              </div>
              {/* NFT Card */}
              <div className="self-center relative">
                <div className="z-20">
                  <motion.div
                    initial={{
                      x: 500,
                      opacity: 0,
                    }}
                    animate={{
                      x: 0,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 1,
                    }}
                    className="z-40 flex flex-col justify-center items-center w-96 self-center p-4 bg-primary/10 rounded-3xl shadow-2xl shadow-violet-300/25"
                  >
                    <div className=" p-4 flex gap-2 flex-col justify-end h-80 w-80 overflow-hidden relative rounded-lg">
                      <img
                        src={Ape}
                        alt="NFT"
                        className="pointer-events-none  scale-125 absolute opacity-100 translate-y-3 z-10"
                      />
                      {/* <video
                        src={Fluff}
                        autoPlay
                        muted
                        loop
                        alt="NFT"
                        className="pointer-events-none  scale-125 absolute translate-y-3"
                      /> */}
                      <p className="z-40 bottom-0s tracking-wider text-white">
                        Hape Beast
                      </p>
                      <div className="flex gap-2 items-center">
                        <img
                          className="rounded-full w-8 z-40"
                          src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80"
                          alt=""
                        />
                        <p className="z-40 text-sm font-thin tracking-wider text-white">
                          Jane Cooper
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center pt-4 p-2 items-center gap-4 z-10">
                      <div className="min-w-max flex flex-col bg-primary/25 py-2 px-6 items-center rounded-xl">
                        <p className="text-sm text-primary-content/30">Bid</p>
                        <p className="">
                          6.78 <span className="text-xs">ETH</span>
                        </p>
                      </div>
                      <div className="flex flex-col bg-primary/25 py-2 px-6 items-center rounded-xl">
                        <p>12</p>
                        <p className="text-sm">Hours</p>
                      </div>
                      <div className="flex flex-col bg-primary/25 py-2 px-6  items-center rounded-xl">
                        <p>58</p>
                        <p className="text-sm">Minutes</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="z-0 rotate-6 absolute top-0 ">
                  <motion.div
                    initial={{
                      x: 500,
                      opacity: 0,
                    }}
                    animate={{
                      x: 0,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 1,
                    }}
                    className="flex flex-col justify-center items-center w-96 self-center p-4 bg-primary/10 rounded-3xl"
                  >
                    <div className="opacity-0 p-4 flex gap-2 flex-col justify-end h-80 w-80 overflow-hidden relative rounded-lg">
                      {/* <img
                        src={Ape}
                        alt="NFT"
                        className="pointer-events-none  scale-125 absolute opacity-50 translate-y-3"
                      /> */}
                      <p className="z-40 bottom-0s tracking-wider text-white">
                        Hape Beast
                      </p>
                      <div className="flex gap-2 items-center">
                        <img
                          className="rounded-full w-8 z-40"
                          src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80"
                          alt=""
                        />
                        <p className="z-40 text-sm font-thin tracking-wider text-white">
                          Jane Cooper
                        </p>
                      </div>
                    </div>
                    <div className="opacity-0 flex justify-center pt-4 p-2 items-center gap-4">
                      <div className="min-w-max flex flex-col bg-gray-100/10 py-2 px-6 items-center rounded-xl">
                        <p className="text-sm text-primary-content/30">Bid</p>
                        <p className="">
                          6.78 <span className="text-xs">ETH</span>
                        </p>
                      </div>
                      <div className="flex flex-col bg-gray-100/10 py-2 px-6 items-center rounded-xl">
                        <p>12</p>
                        <p className="text-sm">Hours</p>
                      </div>
                      <div className="flex flex-col bg-gray-100/10 py-2 px-6  items-center rounded-xl">
                        <p>58</p>
                        <p className="text-sm">Minutes</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <motion.div
          initial={{
            y: 500,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 1.5,
          }}
        >
          <BestCreators title="Our Best Creators" />
        </motion.div>
      </motion.div>
    </>
  );
}

export default Creators;
