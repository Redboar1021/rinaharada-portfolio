import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { type ScheduleItem } from '../data/mockSchedule';
import { fetchSchedules } from '../services/schedule';

const ScheduleContainer = styled(motion.div)`
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

const SectionTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 2rem; 
  margin-top: 80px; 
  margin-bottom: 40px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  letter-spacing: 0.1em;
  font-weight: 400;
  color: #F5F5F5;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-top: 60px;
  }
`;

const EventList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 40px; 
  color: #F5F5F5;

  @media (max-width: 768px) {
    gap: 30px;
  }
`;

const EventItem = styled(motion.li)`
  display: grid;
  grid-template-columns: 180px 1fr; 
  gap: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const EventDate = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1.1rem;
  color: #F5F5F5;
  opacity: 0.9;
`;

const EventDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EventTitle = styled.h3`
  font-family: 'Noto Serif JP', serif;
  font-size: 1.2rem;
  font-weight: 500;
`;

const EventLocation = styled.p`
  font-size: 0.95rem;
  color: #aaa;
  font-family: 'Noto Serif JP', serif;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 50px;
  color: #888;
  font-family: 'Inter', sans-serif;
`;

export const Schedule = () => {
  const [events, setEvents] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API fetch
    const fetchEvents = async () => {
      try {
        const data = await fetchSchedules();
        setEvents(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load schedule.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const upcomingEvents = events.filter(e => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  const pastEvents = events.filter(e => e.date < today).sort((a, b) => b.date.localeCompare(a.date));

  if (loading) return (
    <ScheduleContainer>
      <PageTitle>SCHEDULE</PageTitle>
      <LoadingMessage>Loading...</LoadingMessage>
    </ScheduleContainer>
  );

  if (error) return (
    <ScheduleContainer>
      <PageTitle>SCHEDULE</PageTitle>
      <LoadingMessage>{error}</LoadingMessage>
    </ScheduleContainer>
  );

  return (
    <ScheduleContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageTitle>SCHEDULE</PageTitle>

      <SectionTitle>UPCOMING</SectionTitle>
      <EventList>
        {upcomingEvents.length > 0 ? upcomingEvents.map(event => (
          <EventItem key={event.id} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}>
            <EventDate>{event.date}</EventDate>
            <EventDetails>
              <EventTitle>{event.title}</EventTitle>
              <EventLocation>{event.location}</EventLocation>
            </EventDetails>
          </EventItem>
        )) : <p style={{ fontFamily: 'Noto Serif JP', color: '#888' }}>現在予定されている公演はありません。</p>}
      </EventList>

      <SectionTitle>ARCHIVE</SectionTitle>
      <EventList>
        {pastEvents.map(event => (
          <EventItem key={event.id} style={{ opacity: 0.6 }}>
            <EventDate>{event.date}</EventDate>
            <EventDetails>
              <EventTitle>{event.title}</EventTitle>
              <EventLocation>{event.location}</EventLocation>
            </EventDetails>
          </EventItem>
        ))}
      </EventList>
    </ScheduleContainer>
  );
};
