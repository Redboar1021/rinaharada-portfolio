import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SectionContainer = styled.div`
  padding: 100px 20px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 150px;
  
  @media (max-width: 768px) {
    padding: 80px 20px;
    gap: 100px;
  }
`;

const Section = styled(motion.section)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  letter-spacing: 0.2em;
  font-weight: 400;
  text-transform: uppercase;
  margin-bottom: 20px;
  color: #F5F5F5;
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 1px;
    background-color: #F5F5F5;
    margin: 20px auto 0;
    opacity: 0.5;
  }
`;

const SectionContent = styled.div`
  width: 100%;
  max-width: 800px;
  color: #E0E0E0;
`;

const ViewMoreBtn = styled(Link)`
  display: inline-block;
  padding: 15px 50px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #F5F5F5;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.15em;
  transition: all 0.3s ease;
  margin-top: 10px;
  text-decoration: none;
  background: transparent;
  
  &:hover {
    background-color: #F5F5F5;
    color: #121212;
    border-color: #F5F5F5;
  }
`;

// Specific Components
const GalleryPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const PreviewImage = styled.div`
  background-color: #333;
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.8;
    transition: transform 0.6s ease, opacity 0.3s ease;
  }

  &:hover img {
    opacity: 1;
    transform: scale(1.05);
  }
`;

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 }
  }
};

export const ScrollSections = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Dynamic import to get random images for preview
    const loadImages = () => {
      const modules = import.meta.glob('../../assets/images/gallery/*.JPG', { eager: true });
      const modulesLower = import.meta.glob('../../assets/images/gallery/*.jpg', { eager: true });

      const imageList = [
        ...Object.values(modules).map((mod: any) => mod.default),
        ...Object.values(modulesLower).map((mod: any) => mod.default)
      ];

      // Shuffle and pick 2
      const shuffled = imageList.sort(() => 0.5 - Math.random());
      setImages(shuffled.slice(0, 2));
    };
    loadImages();
  }, []);

  return (
    <SectionContainer>
      {/* Works / Gallery Section */}
      <Section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeIn}
      >
        <SectionTitle>Works</SectionTitle>
        <SectionContent>
          <GalleryPreview>
            {images.map((src, index) => (
              <PreviewImage key={index}>
                <img src={src} alt="Gallery Preview" loading="lazy" />
              </PreviewImage>
            ))}
          </GalleryPreview>
        </SectionContent>
        <ViewMoreBtn to="/works">VIEW GALLERY</ViewMoreBtn>
      </Section>

      {/* Schedule Section */}
      <Section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeIn}
      >
        <SectionTitle>Schedule</SectionTitle>
        <SectionContent>
          <p style={{ fontFamily: 'Noto Serif JP', fontSize: '1.2rem', lineHeight: '2', fontWeight: 300 }}>
            Upcoming concerts and recitals.<br />
            Check the latest performance information.
          </p>
        </SectionContent>
        <ViewMoreBtn to="/schedule">VIEW SCHEDULE</ViewMoreBtn>
      </Section>

      {/* Contact Section */}
      <Section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeIn}
      >
        <SectionTitle>Contact</SectionTitle>
        <SectionContent>
          <p style={{ fontFamily: 'Noto Serif JP', fontSize: '1.1rem', fontWeight: 300 }}>
            For concert requests and other inquiries.
          </p>
        </SectionContent>
        <ViewMoreBtn to="/contact">GET IN TOUCH</ViewMoreBtn>
      </Section>
    </SectionContainer>
  );
};
