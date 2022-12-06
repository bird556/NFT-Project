import Collection from './Collection';
import Creators from './Creators';
import Explore from './Explore';
import Footer from './Footer';
import LineLoader from '../LineLoader';
function Home({ loading, exploreNFT }) {
  // useEffect(() => {
  //   window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  // }, []);

  if (loading) {
    return <LineLoader />;
  }
  return (
    <>
      <Creators />

      <Explore loading={loading} exploreNFT={exploreNFT} />
      <Collection />
      <Footer />
    </>
  );
}

export default Home;
