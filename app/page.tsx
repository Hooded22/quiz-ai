import Container from '../components/HomePage/Container/Container';
import NavBar from '../components/HomePage/NavBar/NavBar';
import MainSection from '../components/HomePage/MainSection/MainSection';
import InterviewAISection from '../components/HomePage/InterviewAISection/InterviewAISection';

export default function Home() {
  const navLinks = [
    { text: 'Home', href: '/' },
    { text: 'Features', href: '/features' },
    { text: 'Pricing', href: '/pricing' },
    { text: 'About', href: '/about' },
  ];

  return (
    <>
      <NavBar links={navLinks} />
      <Container>
        <MainSection />
        <InterviewAISection />
      </Container>
    </>
  );
}
