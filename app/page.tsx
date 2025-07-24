'use client';

import { useState } from 'react';
import Container from '../components/HomePage/Container/Container';
import NavBar from '../components/HomePage/NavBar/NavBar';
import MainSection from '../components/HomePage/MainSection/MainSection';
import InterviewAISection from '../components/HomePage/InterviewAISection/InterviewAISection';
import DemoSection from '../components/HomePage/DemoSection/DemoSection';
import JoinWaitlistSection from '../components/HomePage/JoinWaitlistSection/JoinWaitlistSection';
import Modal from '../components/Modal/Modal';
import JoinWaitlistForm from '../components/JoinWaitlistForm/JoinWaitlistForm';

export default function Home() {
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);

  const navLinks = [
    { text: 'Main', href: '#main' },
    { text: 'Features', href: '#features' },
    { text: 'Demo', href: '#demo' },
    { text: 'Waitlist', href: '#waitlist' },
  ];

  const handleOpenWaitlist = () => {
    setIsWaitlistModalOpen(true);
  };

  const handleCloseWaitlist = () => {
    setIsWaitlistModalOpen(false);
  };

  const handleWaitlistSubmit = async (data: { name: string; role: string; email: string }) => {
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Successfully added to waitlist');
        setIsWaitlistModalOpen(false);
      } else {
        const errorData = await response.json();
        console.error('Failed to add to waitlist:', errorData.error);
      }
    } catch (error) {
      console.error('Error submitting to waitlist:', error);
    }
  };

  return (
    <>
      <NavBar links={navLinks} onJoinWaitlist={handleOpenWaitlist} />
      <Container>
        <section id="main">
          <MainSection onJoinWaitlist={handleOpenWaitlist} />
        </section>
        <section id="features">
          <InterviewAISection />
        </section>
        <section id="demo">
          <DemoSection />
        </section>
        <section id="waitlist">
          <JoinWaitlistSection onSubmit={handleWaitlistSubmit} />
        </section>
      </Container>

      <Modal isOpen={isWaitlistModalOpen} onClose={handleCloseWaitlist} title='Join the Waitlist'>
        <JoinWaitlistForm onSubmit={handleWaitlistSubmit} />
      </Modal>
    </>
  );
}
