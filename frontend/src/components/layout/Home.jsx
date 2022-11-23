import Collection from './Collection';
import Creators from './Creators';
import Explore from './Explore';
import Footer from './Footer';
import LineLoader from '../LineLoader';
import { useEffect } from 'react';
function Home({ loading, exploreNFT, handleTheme, theme }) {
  // useEffect(() => {
  //   window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  // }, []);

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
