import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/login/LoginForm';
import './App.css'
import MainPage from './components/main-page/MainPage';
import NewDetails from './components/news/NewDetails';
import ForgotPassword from './components/login/forgot-password/ForgotPassword';
import ResetPassword from './components/login/forgot-password/ResetPassword';
import CreateAccount from './components/login/CreateAccount';



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
        <Route path='/forgotPassword' element={<ForgotPassword />}/>
        <Route path='/resetPassword/:username/:token' element={< ResetPassword />} />
        <Route path='/register' element={<CreateAccount />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
