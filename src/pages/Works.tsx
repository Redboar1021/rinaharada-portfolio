import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const WorksContainer = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  padding: 120px 20px 100px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-family: 'Noto Serif JP', serif;
  font-size: 2.5rem;
  letter-spacing: 0.1em;
  margin-bottom: 60px;
  text-align: center;
  font-weight: 300;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 40px;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const WorkItem = styled(motion.div)`
  width: 100%;
  aspect-ratio: 1;
  background-color: #eee;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const WorkInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${WorkItem}:hover & {
    opacity: 1;
  }
`;

// Placeholder data for works
const WORKS_DATA = [
    { id: 1, title: 'Concert 2024', location: 'Tokyo' },
    { id: 2, title: 'Recital', location: 'Osaka' },
    { id: 3, title: 'Competition', location: 'Paris' },
    { id: 4, title: 'Collaboration', location: 'London' },
    { id: 5, title: 'Studio Recording', location: 'New York' },
    { id: 6, title: 'Live Session', location: 'Kyoto' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export const Works = () => {
    return (
        <WorksContainer
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            variants={containerVariants}
        >
            <PageTitle>WORKS / GALLERY</PageTitle>

            <GalleryGrid>
                {WORKS_DATA.map((work) => (
                    <WorkItem key={work.id} variants={itemVariants}>
                        <img src="/images/home/home.jpg" alt={work.title} style={{ filter: 'grayscale(20%)' }} />
                        {/* Using hero image as placeholder since we don't have other assets */}
                        <WorkInfo>
                            <h3>{work.title}</h3>
                            <p>{work.location}</p>
                        </WorkInfo>
                    </WorkItem>
                ))}
            </GalleryGrid>
        </WorksContainer>
    );
};
