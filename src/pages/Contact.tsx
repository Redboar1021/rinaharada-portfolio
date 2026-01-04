import { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const ContactContainer = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  padding: 120px 20px 100px;
  max-width: 600px;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
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
  color: #333;
`;

const Input = styled.input`
  padding: 15px;
  border: 1px solid #ddd;
  background-color: transparent;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #333;
  }
`;

const TextArea = styled.textarea`
  padding: 15px;
  border: 1px solid #ddd;
  background-color: transparent;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  min-height: 200px;
  resize: vertical;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #333;
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 15px;
  background-color: #333;
  color: white;
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  margin-top: 20px;
  
  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

const StatusMessage = styled(motion.div) <{ type: 'success' | 'error' }>`
  padding: 15px;
  background-color: ${props => props.type === 'success' ? '#f0fcf4' : '#fef2f2'};
  color: ${props => props.type === 'success' ? '#166534' : '#991b1b'};
  border: 1px solid ${props => props.type === 'success' ? '#bbf7d0' : '#fecaca'};
  text-align: center;
  margin-top: 20px;
`;

export const Contact = () => {
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

        try {
            // API call simulation
            await new Promise(resolve => setTimeout(resolve, 1500));
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <ContactContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <PageTitle>CONTACT</PageTitle>

            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>NAME</Label>
                    <Input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>EMAIL</Label>
                    <Input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>MESSAGE</Label>
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
                    {status === 'loading' ? 'SENDING...' : status === 'success' ? 'SENT' : 'SEND MESSAGE'}
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
                        Message sent successfully. Thank you for contacting me.
                    </StatusMessage>
                )}
                {status === 'error' && (
                    <StatusMessage
                        type="error"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        Failed to send message. Please try again later.
                    </StatusMessage>
                )}
            </AnimatePresence>
        </ContactContainer>
    );
};
