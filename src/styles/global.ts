import { css } from '@emotion/react';

export const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Noto+Serif+JP:wght@300;400;500&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-family: 'Inter', 'Noto Serif JP', sans-serif;
    background-color: #fcfcfc; /* Off-white for clean look */
    color: #333;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: opacity 0.3s ease;
    
    &:hover {
      opacity: 0.7;
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
