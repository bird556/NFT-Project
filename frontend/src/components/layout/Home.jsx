import Collection from './Collection';
import Creators from './Creators';
import Explore from './Explore';
import Footer from './Footer';
import { motion } from 'framer-motion';
import LineLoader from '../LineLoader';

function Home({ loading, exploreNFT }) {
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
