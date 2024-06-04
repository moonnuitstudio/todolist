import React from 'react'
import { createBrowserHistory } from "history";

import ReactDOM from 'react-dom/client'

import { Auth0Provider } from "@auth0/auth0-react"

import App from './App.tsx'
import './index.css'

import { setupAuth0Settings } from './config'

const config = setupAuth0Settings();
const history = createBrowserHistory();

const onRedirectCallback = (appState) => { history.push( appState && appState.returnTo ? appState.returnTo : window.location.pathname ) };

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
    ...(config.audience ? { audience: config.audience } : null),
  },
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider {...providerConfig}>
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
