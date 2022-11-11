import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Ape from '../../assets/jpeg/Ape.jpg';
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
        className="min-h-screen"
      >
        <div className="py-32">
          <div className="">
            <motion.div
              className="flex items-center justify-between"
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
                delay: 1,
              }}
            >
              <div className="max-w-md flex flex-col gap-16">
                <div>
                  <h1 className="text-5xl font-medium leading-tight tracking-wider font-serif">
                    Create and sell your Rare NFTs Collection
                  </h1>
                  <p className="py-8 text-gray-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Animi, quasi at facilis beatae perferendi.
                  </p>
                  <button className="btn btn-primary">Explore Now</button>
                </div>
                <div className="flex gap-16">
                  <div>
                    <p className="text-3xl font-serif mb-2">12k</p>
                    <p className="text-gray-400 text-sm">Collectibles</p>
                  </div>
                  <div>
                    <p className="text-3xl font-serif mb-2">36k</p>
                    <p className="text-gray-400 text-sm">Auctions</p>
                  </div>
                  <div>
                    <p className="text-3xl font-serif mb-2">57k</p>
                    <p className="text-gray-400 text-sm">NFT Artist</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-base-200/25 rounded-3xl">
                <div className="p-4 flex gap-2 flex-col justify-end h-80 w-80 overflow-hidden relative rounded-lg bg-slate-800">
                  <img src={Ape} alt="NFT" className="scale-125 absolute" />
                  <p className="z-50 bottom-0s tracking-wider">Hape Beast</p>
                  <div className="flex gap-2">
                    <img
                      className="rounded-full w-6 z-50"
                      src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80"
                      alt=""
                    />
                    <p className="z-50 text-sm font-thin tracking-wider">
                      Jane Cooper
                    </p>
                  </div>
                </div>
                <div>
                  <p>Current Bid</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        {/* <div>
          <h1 className="text-3xl font-medium  justify-center my-12 flex">
            Our Best Creators
          </h1>
          <div className="grid">
            <div className="flex items-center gap-4">
              <p className="text-xl">1.</p>
              <div className="indicator">
                <span className="indicator-item indicator-bottom indicator-center badge badge-secondary"></span>
                <div className="w-16 rounded-xl">
                  <img src="https://placeimg.com/192/192/people" />
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </motion.div>
    </>
  );
}

export default Creators;
