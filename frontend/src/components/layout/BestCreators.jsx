import React from 'react';

function BestCreators({ title }) {
  return (
    <>
      <div className="py-36">
        <h1 className="text-3xl font-medium  justify-center my-12 flex">
          {title}
        </h1>
        <div className="grid justify-items-center justify-center items-center grid-cols-2 max-[610px]:grid-cols-1  min-[875px]:grid-cols-3 gap-4 gap-y-8">
          <div className="flex flex-col min-[610px]:flex-row items-center gap-4">
            <p className="text-xl">1.</p>
            <div className="flex items-center gap-4">
              <div className="indicator">
                <span className="indicator-item indicator-bottom indicator-center badge badge-secondary"></span>
                <div className="w-12 ">
                  <img
                    src="https://placeimg.com/192/192/people"
                    alt="nft creator"
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
            <div className="justify-center flex-col items-center max-[610px]:flex">
              <p>Darlene Washington</p>
              <p>$359,231</p>
            </div>
          </div>
          <div className="flex flex-col min-[610px]:flex-row items-center gap-4">
            <p className="text-xl">1.</p>
            <div className="flex items-center gap-4">
              <div className="indicator">
                <span className="indicator-item indicator-bottom indicator-center badge badge-secondary"></span>
                <div className="w-12 ">
                  <img
                    src="https://placeimg.com/192/192/people"
                    alt="nft creator"
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
            <div className="justify-center flex-col items-center max-[610px]:flex">
              <p>Darlene Washington</p>
              <p>$359,231</p>
            </div>
          </div>
          <div className="flex flex-col min-[610px]:flex-row items-center gap-4">
            <p className="text-xl">1.</p>
            <div className="flex items-center gap-4">
              <div className="indicator">
                <span className="indicator-item indicator-bottom indicator-center badge badge-secondary"></span>
                <div className="w-12 ">
                  <img
                    src="https://placeimg.com/192/192/people"
                    alt="nft creator"
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
            <div className="justify-center flex-col items-center max-[610px]:flex">
              <p>Darlene Washington</p>
              <p>$359,231</p>
            </div>
          </div>
          <div className="flex flex-col min-[610px]:flex-row items-center gap-4">
            <p className="text-xl">1.</p>
            <div className="flex items-center gap-4">
              <div className="indicator">
                <span className="indicator-item indicator-bottom indicator-center badge badge-secondary"></span>
                <div className="w-12 ">
                  <img
                    src="https://placeimg.com/192/192/people"
                    alt="nft creator"
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
            <div className="justify-center flex-col items-center max-[610px]:flex">
              <p>Darlene Washington</p>
              <p>$359,231</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BestCreators;

BestCreators.defaultProps = {
  title: 'Our Best Creators',
};
