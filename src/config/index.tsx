const auth0_audience = import.meta.env.VITE_AUTH0_AUDIENCE;
const auth0_client_id = import.meta.env.VITE_AUTH0_CLIENT_ID;
const auth0_domain = import.meta.env.VITE_AUTH0_DOMAIN;

export function setupAuth0Settings() {
    const audience = auth0_audience ? auth0_audience : null;
    
    return {
      domain: auth0_domain,
      clientId: auth0_client_id,
      ...(audience ? { audience } : null),
    };
  }