import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { googleConfig } from './config';
import { NextUIProvider } from "@nextui-org/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //add your google web client id below in the clientId prop
  <GoogleOAuthProvider clientId={googleConfig.client_id}>
      <NextUIProvider>
        <App />
      </NextUIProvider>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
