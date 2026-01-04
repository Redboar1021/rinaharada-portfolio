import styled from '@emotion/styled';
import { Global } from '@emotion/react';
import { globalStyles } from '../../styles/global';
import { Navigation } from './Navigation';
import type { ReactNode } from 'react';

const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  position: relative;
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
                {children}
            </Main>
        </>
    );
};
