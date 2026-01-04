import { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  mix-blend-mode: difference;
  color: white;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Logo = styled(Link)`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1.2rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  z-index: 1001;
`;

const DesktopMenu = styled.div`
  display: flex;
  gap: 3rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001;
  color: white;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #111;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  z-index: 1000;
`;

const NavLink = styled(Link) <{ $isActive?: boolean }>`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  opacity: ${props => props.$isActive ? 1 : 0.6};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: currentColor;
    transform: scaleX(${props => props.$isActive ? 1 : 0});
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  &:hover {
    opacity: 1;
    &::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
`;

const MobileNavLink = styled(Link)`
  font-family: 'Noto Serif JP', serif;
  font-size: 2rem;
  color: white;
  opacity: 0.8;
  
  &:hover {
    opacity: 1;
  }
`;

const LINKS = [
    { path: '/', label: 'Home' },
    { path: '/works', label: 'Works' },
    { path: '/schedule', label: 'Schedule' },
    { path: '/contact', label: 'Contact' },
];

export const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    // Hamburger icon paths
    const Path = (props: any) => (
        <motion.path
            fill="transparent"
            strokeWidth="2"
            stroke="currentColor"
            strokeLinecap="round"
            {...props}
        />
    );

    return (
        <>
            <NavContainer>
                <Logo to="/" onClick={() => setIsOpen(false)}>Rina Harada</Logo>

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

                <MobileMenuButton onClick={toggleMenu}>
                    <svg width="23" height="23" viewBox="0 0 23 23">
                        <Path
                            variants={{
                                closed: { d: "M 2 2.5 L 20 2.5" },
                                open: { d: "M 3 16.5 L 17 2.5" }
                            }}
                            animate={isOpen ? "open" : "closed"}
                        />
                        <Path
                            d="M 2 9.423 L 20 9.423"
                            variants={{
                                closed: { opacity: 1 },
                                open: { opacity: 0 }
                            }}
                            transition={{ duration: 0.1 }}
                            animate={isOpen ? "open" : "closed"}
                        />
                        <Path
                            variants={{
                                closed: { d: "M 2 16.346 L 20 16.346" },
                                open: { d: "M 3 2.5 L 17 16.346" }
                            }}
                            animate={isOpen ? "open" : "closed"}
                        />
                    </svg>
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
                    </MobileMenuOverlay>
                )}
            </AnimatePresence>
        </>
    );
};
