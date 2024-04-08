import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/login/LoginForm';
import './App.css'
import MainPage from './components/main-page/MainPage';
import NewDetails from './components/news/NewDetails';



const theme = createTheme({
  palette: {
    background: {
      default: '#D9D9D9',
      paper: "#e2ddd9",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/index' element={<MainPage />} />
        <Route path='/newComplete/:id' element={<NewDetails />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
