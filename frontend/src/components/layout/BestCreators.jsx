import commaNumber from 'comma-number';
function BestCreators({ title, revenue }) {
  return (
    <>
      <div className="py-36">
        <h1 className="text-3xl font-medium  justify-center my-12 flex max-[290px]:text-2xl">
          {title}
        </h1>
        <div className="grid justify-items-center justify-center items-center grid-cols-2 max-[610px]:grid-cols-1  min-[875px]:grid-cols-3 gap-4 gap-y-24">
          {revenue.map((data, index) => {
            const { name, userImage, revenue, firstName, lastName } = data.data;
            return (
              <div className="flex flex-col min-[610px]:flex-row items-center gap-4 w-full justify-center">
                <p className="text-xl">{index + 1}.</p>
                <div className="flex items-center gap-4">
                  <div className="indicator">
                    <span className="indicator-item indicator-bottom indicator-center badge badge-secondary"></span>
                    <div className="w-12">
                      <img
                        src={
                          !userImage
                            ? 'https://placeimg.com/192/192/people'
                            : userImage
                        }
                        alt={!name ? `${firstName} ${lastName}` : name}
                        className="rounded-xl w-12 h-12 object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="justify-center flex-col items-center max-[610px]:flex">
                  <p className="w-36 max-[610px]:text-center">
                    {!name ? `${firstName} ${lastName}` : name}
                  </p>
                  <p>${commaNumber(revenue)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default BestCreators;

BestCreators.defaultProps = {
  title: 'Our Best Creators',
};
