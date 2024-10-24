import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import SessionContextProvider from './contexts/SessionContext.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <SessionContextProvider>
                <App />
            </SessionContextProvider>
        </BrowserRouter>
    </StrictMode>,
);
