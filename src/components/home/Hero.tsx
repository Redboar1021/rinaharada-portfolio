import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import homeImage from '../../assets/images/home/home.jpg';
import { media } from '../../styles/media';

const HeroContainer = styled.section`
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-image: url(${homeImage});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }
`;

const HeroText = styled(motion.h1)`
  font-family: 'Noto Serif JP', serif;
  font-size: 5rem; 
  color: #F5F5F5;
  font-weight: 300;
  letter-spacing: 0.25em; 
  text-shadow: 0 4px 20px rgba(0,0,0,0.5);
  text-align: center;
  z-index: 1;
  width: 100%;
  padding: 0 20px;
  
  ${media.tablet} {
    font-size: 4rem;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    letter-spacing: 0.2em;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 40px; 
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #F5F5F5;
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  gap: 15px;
  opacity: 0.8;
  z-index: 1;
  
  &::after {
    content: '';
    width: 1px;
    height: 60px; 
    background-color: #F5F5F5;
  }
`;

export const Hero = () => {
  return (
    <HeroContainer>
      <HeroText
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
      >
        PIANIST
      </HeroText>

      <ScrollIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        SCROLL
      </ScrollIndicator>
    </HeroContainer>
  );
};
