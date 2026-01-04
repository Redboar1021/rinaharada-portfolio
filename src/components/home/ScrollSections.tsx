import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SectionContainer = styled.div`
  padding: 100px 20px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 150px;
  
  @media (max-width: 768px) {
    padding: 60px 20px;
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
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 20px;
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 40px;
    height: 1px;
    background-color: #333;
    margin: 20px auto 0;
  }
`;

const SectionContent = styled.div`
  width: 100%;
  max-width: 800px;
`;

const ViewMoreBtn = styled(Link)`
  display: inline-block;
  padding: 15px 40px;
  border: 1px solid #333;
  color: #333;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
  margin-top: 30px;
  
  &:hover {
    background-color: #333;
    color: white;
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
  }
`;

const PreviewImage = styled.div`
  background-color: #eee;
  width: 100%;
  aspect-ratio: 4/3;
  // Placeholder for real images
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
    return (
        <SectionContainer>
            {/* Works / Gallery Section */}
            <Section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
            >
                <SectionTitle>Works</SectionTitle>
                <SectionContent>
                    <GalleryPreview>
                        <PreviewImage />
                        <PreviewImage />
                    </GalleryPreview>
                </SectionContent>
                <ViewMoreBtn to="/works">VIEW GALLERY</ViewMoreBtn>
            </Section>

            {/* Schedule Section */}
            <Section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
            >
                <SectionTitle>Schedule</SectionTitle>
                <SectionContent>
                    <p style={{ fontFamily: 'Noto Serif JP', fontSize: '1.2rem', lineHeight: '2' }}>
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
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
            >
                <SectionTitle>Contact</SectionTitle>
                <SectionContent>
                    <p>For concert requests and other inquiries.</p>
                </SectionContent>
                <ViewMoreBtn to="/contact">GET IN TOUCH</ViewMoreBtn>
            </Section>
        </SectionContainer>
    );
};
