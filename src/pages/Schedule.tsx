import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { mockSchedules, type ScheduleItem } from '../data/mockSchedule';

const ScheduleContainer = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  padding: 120px 20px 100px;
  max-width: 800px;
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

const SectionTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  margin-top: 60px;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  letter-spacing: 0.1em;
`;

const EventList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const EventItem = styled(motion.li)`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 20px;
  padding-bottom: 20px;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const EventDate = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: #666;
`;

const EventDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const EventTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 500;
`;

const EventLocation = styled.p`
  font-size: 0.9rem;
  color: #888;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 50px;
  color: #888;
`;

export const Schedule = () => {
  const [events, setEvents] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API fetch
    const fetchEvents = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
        setEvents(mockSchedules);
        setLoading(false);
      } catch (err) {
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
          <EventItem key={event.id} initial={{ borderBottom: "1px solid transparent" }} whileHover={{ x: 10 }}>
            <EventDate>{event.date}</EventDate>
            <EventDetails>
              <EventTitle>{event.title}</EventTitle>
              <EventLocation>{event.location}</EventLocation>
            </EventDetails>
          </EventItem>
        )) : <p>No upcoming events.</p>}
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
