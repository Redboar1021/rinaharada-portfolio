import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { media } from '../../styles/media';
import { SNSLinks } from './SNSLinks';

const NavContainer = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 40px 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  transition: padding 0.3s ease, background 0.3s ease;
  background: ${props => props.$scrolled ? 'rgba(18, 18, 18, 0.9)' : 'transparent'};
  backdrop-filter: ${props => props.$scrolled ? 'blur(10px)' : 'none'};

  ${media.tablet} {
    padding: 30px 40px;
  }

  @media (max-width: 768px) {
    padding: 20px 24px;
  }
`;

const LogoContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: #F5F5F5;
  z-index: 101;
`;

const LogoSubtitle = styled.span`
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  font-weight: 300;
  margin-bottom: 2px;
  opacity: 0.8;
`;

const LogoTitle = styled.span`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  letter-spacing: 0.1em;
  font-weight: 400;
  text-transform: uppercase;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const DesktopMenu = styled.div`
  display: none;
  
  ${media.desktop} {
    display: flex;
    gap: 3rem;
    align-items: center;
  }
`;

const NavLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== '$isActive'
}) <{ $isActive?: boolean }>`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem; 
  letter-spacing: 0.1em; 
  text-transform: uppercase;
  color: #F5F5F5;
  opacity: ${props => props.$isActive ? 1 : 0.6};
  position: relative;
  transition: opacity 0.3s;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0%;
    height: 1px;
    background-color: #F5F5F5;
    transition: width 0.3s ease;
  }

  &:hover {
    opacity: 1;
    &::after {
      width: 100%;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 101;
  color: #F5F5F5;
  padding: 10px;

  ${media.desktop} {
    display: none;
  }

  span {
    display: block;
    width: 24px;
    height: 1px;
    background-color: currentColor;
    transition: all 0.3s ease;
  }
`;

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #121212;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  z-index: 100;
`;

const MobileNavLink = styled(Link)`
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  color: #F5F5F5;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.7;
  transition: opacity 0.3s;
  
  &:hover {
    opacity: 1;
  }
`;

const LINKS = [
  { path: '/about', label: 'ABOUT' },
  { path: '/works', label: 'WORKS' },
  { path: '/schedule', label: 'SCHEDULE' },
  { path: '/videos', label: 'VIDEOS' },
  { path: '/lesson', label: 'LESSON' },
  { path: '/contact', label: 'CONTACT' },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <NavContainer $scrolled={scrolled}>
        <LogoContainer to="/" onClick={() => setIsOpen(false)}>
          <LogoSubtitle>PIANIST</LogoSubtitle>
          <LogoTitle>Rina Harada</LogoTitle>
        </LogoContainer>

        <DesktopMenu>
          {LINKS.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              $isActive={location.pathname === link.path}
            >
              {link.label}
            </NavLink>
          ))}
        </DesktopMenu>

        <MobileMenuButton onClick={toggleMenu} aria-label="Menu">
          <span style={{ transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ opacity: isOpen ? 0 : 1 }} />
          <span style={{ transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </MobileMenuButton>
      </NavContainer>

      <AnimatePresence>
        {isOpen && (
          <MobileMenuOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {LINKS.map(link => (
              <MobileNavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </MobileNavLink>
            ))}
            <SNSLinks className="mt-8" />
          </MobileMenuOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

