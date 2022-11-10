import Collection from './Collection';
import Creators from './Creators';
import Explore from './Explore';
import Footer from './Footer';
import { motion } from 'framer-motion';

function Home() {
  return (
    <>
      <Creators />

      <Explore />
      <Collection />
      <Footer />
    </>
  );
}

export default Home;
