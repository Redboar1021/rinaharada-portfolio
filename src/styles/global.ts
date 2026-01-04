import { css } from '@emotion/react';

export const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500&family=Noto+Serif+JP:wght@300;400;500&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    width: 100%;
    min-height: 100vh;
    font-family: 'Inter', 'Noto Serif JP', serif;
    background-color: #121212;
    color: #F5F5F5;
    line-height: 1.8;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
  }

  /* Selection color for premium feel */
  ::selection {
    background: rgba(200, 200, 200, 0.2);
    color: #fff;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
    
    &:hover {
      opacity: 0.8;
    }
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    display: block;
  }
`;
