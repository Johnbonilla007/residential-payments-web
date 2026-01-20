import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    /* Soft Premium Color Palette - Pastel & Gentle */
    --primary-gradient: linear-gradient(135deg, #001f3f 0%, #003366 100%);
    --secondary-gradient: linear-gradient(135deg, #ffd4e5 0%, #ffb3ba 100%);
    --success-gradient: linear-gradient(135deg, #b3e5fc 0%, #81d4fa 100%);
    --dark-gradient: linear-gradient(135deg, #546e7a 0%, #607d8b 50%, #78909c 100%);
    --glass-bg: rgba(255, 255, 255, 0.08);
    --glass-border: rgba(255, 255, 255, 0.15);
    
    /* Neutral Soft Colors */
    --color-primary: #003366;
    --color-secondary: #001f3f;
    --color-dark: #37474f;
    --color-light: #fafbfc;
    --color-text: #546e7a;
    --color-text-light: #90a4ae;
    --color-border: #eceff1;
    --color-shadow: rgba(0, 0, 0, 0.06);
    
    /* Spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;
    
    /* Border Radius */
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    --radius-2xl: 1.5rem;
    --radius-full: 9999px;
    
    /* Soft Shadows */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.03);
    --shadow-md: 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.04);
    --shadow-lg: 0 6px 12px -2px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
    --shadow-xl: 0 12px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-2xl: 0 20px 30px -8px rgba(0, 0, 0, 0.12);
    
    /* Transitions */
    --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    color: var(--color-text);
    background-color: var(--color-light);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    color: var(--color-dark);
    margin-bottom: var(--spacing-md);
  }

  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.75rem; }
  h4 { font-size: 1.5rem; }
  h5 { font-size: 1.25rem; }
  h6 { font-size: 1rem; }

  p {
    font-size: 1rem;
    line-height: 1.75;
    margin-bottom: var(--spacing-md);
  }

  /* Form Elements with Premium Styling */
  input, button, select, textarea {
    font-family: inherit;
    font-size: 0.95rem;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    transition: all var(--transition-base);
    outline: none;
  }

  input:focus, select:focus, textarea:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  button {
    cursor: pointer;
    font-weight: 500;
    transition: all var(--transition-base);
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  button:active {
    transform: translateY(0);
  }

  /* Utility Classes */
  .text-center { text-align: center; }
  .text-left { text-align: left; }
  .text-right { text-align: right; }
  
  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-light);
    border-radius: var(--radius-full);
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    border-radius: var(--radius-full);
    transition: background var(--transition-base);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, var(--color-secondary), var(--color-primary));
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }

  /* Responsive Typography */
  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
    
    h1 { font-size: 2rem; }
    h2 { font-size: 1.75rem; }
    h3 { font-size: 1.5rem; }
    h4 { font-size: 1.25rem; }
    h5 { font-size: 1.1rem; }
    h6 { font-size: 1rem; }
  }

  @media (max-width: 480px) {
    html {
      font-size: 13px;
    }
  }
`;

export default GlobalStyles;
