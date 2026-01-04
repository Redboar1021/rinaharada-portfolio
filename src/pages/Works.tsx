import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { media } from '../styles/media';

const WorksContainer = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  padding: 160px 20px 120px;
  max-width: 100%; 
  margin: 0 auto;
  display: flex;
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 100px 20px 80px;
    gap: 40px;
  }
`;

const Sidebar = styled.div`
  width: 250px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 160px;
  height: fit-content;
  
  @media (max-width: 1024px) {
    width: 200px;
  }

  @media (max-width: 768px) {
    width: 100%;
    position: static;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
  }
`;

const VerticalTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 2.5rem;
  letter-spacing: 0.2em;
  font-weight: 300;
  text-transform: uppercase;
  color: #F5F5F5;
  writing-mode: vertical-rl;
  text-orientation: upright;
  margin: 0;
  
  @media (max-width: 768px) {
    writing-mode: horizontal-tb;
    font-size: 2rem;
  }
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 100px;
  background-color: #F5F5F5;
  margin: 30px 0;
  opacity: 0.5;
  
  @media (max-width: 768px) {
    width: 60px;
    height: 1px;
    margin: 0;
  }
`;

const SidebarSubtitle = styled.div`
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.9rem;
  letter-spacing: 0.2em;
  color: #F5F5F5;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  text-transform: uppercase;
  opacity: 0.7;
  
  @media (max-width: 768px) {
    writing-mode: horizontal-tb;
  }
`;

const GalleryGrid = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 20px;
  
  ${media.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1600px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const WorkItem = styled(motion.div) <{ $span?: number }>`
  width: 100%;
  aspect-ratio: 1;
  background-color: #333;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  border-radius: 4px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 40px;
  cursor: pointer;
`;

const ModalImage = styled(motion.img)`
  max-width: 95%;
  max-height: 95vh;
  object-fit: contain;
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
`;

export const Works = () => {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Dynamic import of images from src/assets/images/gallery/
    const loadImages = async () => {
      // Import all JPG files from the gallery directory
      const modules = import.meta.glob('../assets/images/gallery/*.JPG', { eager: true });
      const modulesLower = import.meta.glob('../assets/images/gallery/*.jpg', { eager: true });

      const imageList = [
        ...Object.values(modules).map((mod: any) => mod.default),
        ...Object.values(modulesLower).map((mod: any) => mod.default)
      ];
      setImages(imageList);
    };
    loadImages();
  }, []);

  return (
    <>
      <WorksContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Sidebar>
          <VerticalTitle>WORKS</VerticalTitle>
          <VerticalLine />
          <SidebarSubtitle>GALLERY</SidebarSubtitle>
        </Sidebar>

        <GalleryGrid>
          {images.map((src, index) => (
            <WorkItem
              key={index}
              layoutId={`work-${index}`}
              onClick={() => setSelectedImage(src)}
              whileHover={{ opacity: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <img src={src} alt={`Work ${index}`} loading="lazy" />
            </WorkItem>
          ))}
        </GalleryGrid>
      </WorksContainer>

      <AnimatePresence>
        {selectedImage && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <ModalImage
              src={selectedImage}
              layoutId={`modal-${selectedImage}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // Keep open if clicked on image? Or close. Usually close on bg click only.
            />
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
};
