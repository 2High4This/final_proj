import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import React from 'react';

import { AuthProvider } from './things_for_auth/keepAuth';
import { MyRoutes } from './routes';
import { MyAppBar } from './comps/appbar';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <AuthProvider>
        <BrowserRouter>
          <MyAppBar />
          <MyRoutes />
        </BrowserRouter>
      </AuthProvider>
    </LocalizationProvider>
  </React.StrictMode>
);
