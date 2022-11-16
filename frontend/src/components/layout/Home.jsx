import Collection from './Collection';
import Creators from './Creators';
import Explore from './Explore';
import Footer from './Footer';
import LineLoader from '../LineLoader';

function Home({ loading, exploreNFT, handleTheme, theme }) {
  if (loading) {
    return <LineLoader />;
  }
  return (
    <>
      <Creators />

      <Explore
        loading={loading}
        exploreNFT={exploreNFT}
        handleTheme={handleTheme}
        theme={theme}
      />
      <Collection />
      <Footer />
    </>
  );
}

export default Home;
