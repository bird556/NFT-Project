import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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
        <div className="hero py-32">
          <div className="hero-content flex-col lg:flex-row-reverse !max-w-max">
            <div className="grow">
              <motion.img
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
                src="https://placeimg.com/260/400/arch"
                className="max-w-sm rounded-lg shadow-2xl pointer-events-none"
              />
            </div>

            <div className="">
              <h1 className="text-5xl font-medium">Blockchain NFT's</h1>
              <h2 className="text-2xl">Get paid for your NFT's</h2>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <button
                onClick={() => navigate('/dashboard')}
                className="btn btn-primary"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
        <div>
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
        </div>
      </motion.div>
    </>
  );
}

export default Creators;
