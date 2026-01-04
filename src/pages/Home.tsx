import styled from '@emotion/styled';
import { Hero } from '../components/home/Hero';
import { ScrollSections } from '../components/home/ScrollSections';
import { motion } from 'framer-motion';

const HomeContainer = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  /* padding-bottom: 50px; Removed padding as it might interfere with full screen sections */
`;

export const Home = () => {
  return (
    <HomeContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <ScrollSections />
    </HomeContainer>
  );
};
