import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();
const root = createRoot(document.getElementById('root'));

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <Auth0Provider
        domain="dev-72787xh0mdfz0rty.us.auth0.com"
        clientId="HVShoCBoAyu81ZeNMfP2ZktHXdbScSEH"
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <App />
      </Auth0Provider>,
    </BrowserRouter>
  </React.StrictMode>,
);
