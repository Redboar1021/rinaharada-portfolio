import styled from '@emotion/styled';
import { Global } from '@emotion/react';
import { globalStyles } from '../../styles/global';
import { Navigation } from './Navigation';
import { SNSLinks } from './SNSLinks';
import { media } from '../../styles/media';
import type { ReactNode } from 'react';

const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  position: relative;
`;

const FixedSNSWrapper = styled.div`
  position: fixed;
  bottom: 40px;
  left: 60px;
  z-index: 100;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Global styles={globalStyles} />
            <Main>
                <Navigation />
                <FixedSNSWrapper>
                    <SNSLinks />
                </FixedSNSWrapper>
                {children}
            </Main>
        </>
    );
};
