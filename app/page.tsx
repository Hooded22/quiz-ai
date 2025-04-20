import { redirect } from 'next/navigation';
import { FEATURE_FLAGS } from 'constants/featureFlags';
import Container from '../components/HomePage/Container/Container';
import Header from '../components/HomePage/Header/Header';
import Statistics from '../components/HomePage/Statistics/Statistics';
import NavBar from '../components/HomePage/NavBar/NavBar';
import MainSection from '../components/HomePage/MainSection/MainSection';

export default function Home() {
  // Sample navigation links
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
      </Container>
    </>
  );
}
