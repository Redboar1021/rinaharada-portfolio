import styled from '@emotion/styled';
import { Hero } from '../components/home/Hero';
import { ScrollSections } from '../components/home/ScrollSections';
import { motion } from 'framer-motion';

const HomeContainer = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  padding-bottom: 50px;
`;

const SNSContainer = styled.div`
  position: fixed;
  bottom: 40px;
  left: 40px;
  display: flex;
  gap: 20px;
  z-index: 100;
  
  @media (max-width: 768px) {
    left: 20px;
    bottom: 20px;
    gap: 15px;
  }
`;

const SNSIcon = styled.a`
  color: #333; // Will be overlaid on images, might need white or mix-blend-mode
  font-size: 1.2rem;
  opacity: 0.7;
  transition: opacity 0.3s;
  mix-blend-mode: difference;
  color: white;

  &:hover {
    opacity: 1;
  }
`;

// Simple SVG Icons
const IconInstagram = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const IconYouTube = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
);
const IconX = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
);

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

            <SNSContainer>
                <SNSIcon href="#" target="_blank"><IconInstagram /></SNSIcon>
                <SNSIcon href="#" target="_blank"><IconYouTube /></SNSIcon>
                <SNSIcon href="#" target="_blank"><IconX /></SNSIcon>
            </SNSContainer>
        </HomeContainer>
    );
};
