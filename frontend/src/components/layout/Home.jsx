import Collection from './Collection';
import Creators from './Creators';
import Explore from './Explore';
import Footer from './Footer';
import LineLoader from '../LineLoader';
function Home({ loading, exploreNFT, revenue }) {
  if (loading) {
    return <LineLoader />;
  }
  return (
    <>
      <Creators revenue={revenue} />
      <Explore loading={loading} exploreNFT={exploreNFT} />
      {/* <Collection /> */}
      <Footer />
    </>
  );
}

export default Home;
