import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const HeroContainer = styled.section`
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/home/home.jpg');
  background-size: cover;
  background-position: center;
  z-index: -1;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2); /* Slight overlay for text readability */
  }
`;

const HeroText = styled(motion.h1)`
  font-family: 'Noto Serif JP', serif;
  font-size: 4rem;
  color: white;
  font-weight: 300;
  letter-spacing: 0.2em;
  text-shadow: 0 4px 10px rgba(0,0,0,0.3);
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
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
  color: white;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  gap: 10px;
  opacity: 0.8;
  
  &::after {
    content: '';
    width: 1px;
    height: 60px;
    background-color: white;
  }
`;

export const Hero = () => {
    return (
        <HeroContainer>
            <BackgroundImage />
            <HeroText
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
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
