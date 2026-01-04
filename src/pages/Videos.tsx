import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const VideosContainer = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  padding: 160px 40px 120px;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 120px 20px 100px;
  }
`;

const PageTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 3.5rem;
  letter-spacing: 0.1em;
  margin-bottom: 80px;
  text-align: center;
  font-weight: 300;
  text-transform: uppercase;
  color: #F5F5F5;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 60px;
  }
`;

const VideoGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px; 

  @media (max-width: 768px) {
    gap: 60px;
  }
`;

const VideoWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  background-color: #000;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const VideoItem = styled.div`
  width: 100%;
`;

// Initial video data
const VIDEO_IDS = [
  'hOwu3BFWlRo', // Replace with actual videos
  'VyNNztb1Irk',
  'Bm7bVQI_MnE'
];

export const Videos = () => {
  return (
    <VideosContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageTitle>VIDEOS</PageTitle>

      <VideoGrid>
        {VIDEO_IDS.map(id => (
          <VideoItem key={id}>
            <VideoWrapper>
              <iframe
                src={`https://www.youtube.com/embed/${id}?rel=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </VideoWrapper>
          </VideoItem>
        ))}
      </VideoGrid>
    </VideosContainer>
  );
};
