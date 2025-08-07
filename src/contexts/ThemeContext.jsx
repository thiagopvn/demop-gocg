import { createContext, useState, useContext, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProviderWrapper = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#1e3a5f' : '#4a6fa5',
        light: '#4a6fa5',
        dark: '#0f1e35',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#ff6b35',
        light: '#ff9563',
        dark: '#cc4410',
        contrastText: '#ffffff',
      },
      background: {
        default: mode === 'light' ? '#f8fafc' : '#0f1419',
        paper: mode === 'light' ? '#ffffff' : '#1a202c',
      },
      text: {
        primary: mode === 'light' ? '#1a202c' : '#e2e8f0',
        secondary: mode === 'light' ? '#718096' : '#a0aec0',
      },
      success: {
        main: '#48bb78',
      },
      error: {
        main: '#f56565',
      },
      warning: {
        main: '#ed8936',
      },
      info: {
        main: '#4299e1',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.5,
      },
      h6: {
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: 1.5,
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: '10px 24px',
            fontSize: '0.95rem',
            boxShadow: 'none',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
            },
          },
          contained: {
            backgroundImage: mode === 'light' 
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : 'linear-gradient(135deg, #4a6fa5 0%, #667eea 100%)',
            '&:hover': {
              backgroundImage: mode === 'light'
                ? 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'
                : 'linear-gradient(135deg, #667eea 0%, #4a6fa5 100%)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: mode === 'light' 
              ? '0 4px 20px rgba(0,0,0,0.08)' 
              : '0 4px 20px rgba(0,0,0,0.3)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            backdropFilter: 'blur(10px)',
            background: mode === 'light'
              ? 'rgba(255, 255, 255, 0.9)'
              : 'rgba(26, 32, 44, 0.9)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: mode === 'light'
                ? '0 12px 40px rgba(0,0,0,0.15)'
                : '0 12px 40px rgba(0,0,0,0.5)',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 10,
              transition: 'all 0.3s ease',
              backgroundColor: mode === 'light' 
                ? 'rgba(255, 255, 255, 0.8)'
                : 'rgba(45, 55, 72, 0.5)',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              },
              '&.Mui-focused': {
                boxShadow: '0 4px 20px rgba(102, 126, 234, 0.25)',
              },
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundImage: 'none',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 20,
            padding: '8px',
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: 'none',
            borderRadius: 12,
            '& .MuiDataGrid-cell': {
              borderBottom: mode === 'light' 
                ? '1px solid rgba(0, 0, 0, 0.05)'
                : '1px solid rgba(255, 255, 255, 0.05)',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: mode === 'light' ? '#f8fafc' : '#1a202c',
              borderRadius: '12px 12px 0 0',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: mode === 'light' ? '#f1f5f9' : '#2d3748',
            },
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            '&:hover': {
              boxShadow: '0 12px 32px rgba(0,0,0,0.20)',
            },
          },
        },
      },
    },
  }), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};