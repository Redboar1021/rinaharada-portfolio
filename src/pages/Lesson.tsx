import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const LessonContainer = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  padding: 160px 40px 120px;
  max-width: 900px; 
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

const Description = styled.div`
  font-family: 'Noto Serif JP', serif;
  font-size: 1rem;
  line-height: 2.2;
  text-align: justify;
  margin-bottom: 80px;
  color: #E0E0E0;
`;

// Reuse styles from Contact page for consistency, but define locally or extract to common components if needed.
// For now, redefining specific styled components for the form.

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 40px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.02);
`;

const FormTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 300;
  color: #F5F5F5;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  color: #F5F5F5;
  text-transform: uppercase;
  opacity: 0.8;
`;

const Input = styled.input`
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.05);
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  transition: border-color 0.3s;
  color: #F5F5F5;
  
  &:focus {
    outline: none;
    border-color: #F5F5F5;
  }
`;

const TextArea = styled.textarea`
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.05);
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s;
  color: #F5F5F5;
  
  &:focus {
    outline: none;
    border-color: #F5F5F5;
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 15px;
  background-color: #F5F5F5;
  color: #121212;
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  margin-top: 10px;
  text-transform: uppercase;
  
  &:disabled {
    background-color: #555;
    color: #999;
    cursor: not-allowed;
  }
`;

const StatusMessage = styled(motion.div) <{ type: 'success' | 'error' }>`
  padding: 15px;
  background-color: ${props => props.type === 'success' ? 'rgba(22, 101, 52, 0.2)' : 'rgba(153, 27, 27, 0.2)'};
  color: ${props => props.type === 'success' ? '#bbf7d0' : '#fecaca'};
  border: 1px solid ${props => props.type === 'success' ? 'rgba(187, 247, 208, 0.2)' : 'rgba(254, 202, 202, 0.2)'};
  text-align: center;
  margin-top: 20px;
`;

export const Lesson = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Prepare payload with source identifier
    const payload = {
      ...formData,
      source: 'Lesson'
    };
    console.log('Sending lesson inquiry:', payload);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <LessonContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageTitle>{t('lesson.title')}</PageTitle>

      <Description>
        {t('lesson.description')}
      </Description>

      <Form onSubmit={handleSubmit}>
        <FormTitle>INQUIRY</FormTitle>
        <FormGroup>
          <Label>{t('contact.name')}</Label>
          <Input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>{t('contact.email')}</Label>
          <Input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>{t('contact.message')}</Label>
          <TextArea
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
          />
        </FormGroup>

        <SubmitButton
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {status === 'loading' ? t('contact.sending') : status === 'success' ? t('contact.sent') : t('contact.send')}
        </SubmitButton>
      </Form>

      <AnimatePresence>
        {status === 'success' && (
          <StatusMessage
            type="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            Thank you for your inquiry.
          </StatusMessage>
        )}
      </AnimatePresence>
    </LessonContainer>
  );
};
