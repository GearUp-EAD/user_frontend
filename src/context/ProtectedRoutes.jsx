import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8081',
  realm: 'Elite-Gear',
  clientId: 'Elite-Gear',
});

// Logout function
export const logout = async () => {
  try {
    if (!keycloak.authenticated) {
      await keycloak.init({ onLoad: 'check-sso' });
    }

    await keycloak.logout();
    
    // Clear any application state/storage if needed
    localStorage.removeItem('user-settings'); // Example
  } catch (error) {
    console.error('Logout failed:', error);
    // Handle logout failure - show user feedback
  }
};

// Login function
export const login = async () => {
  try {
    // Initialize Keycloak
    await keycloak.init({
      onLoad: 'login-required',
      checkLoginIframe: false,
    });

    // If authentication successful
    if (keycloak.authenticated) {
      console.log('User authenticated');
      // Store tokens if needed
      localStorage.setItem('access-token', keycloak.token);
      localStorage.setItem('refresh-token', keycloak.refreshToken);
      
      return true;
    } else {
      console.warn('Authentication failed');
      return false;
    }

  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const getIdToken = () => {
  try {
    if (!keycloak.authenticated) {
      console.warn('User not authenticated');
      return "not authenticated";
    }
    console.log("in the id token retrieve function");
    console.log(keycloak.idToken);
    return "authenticated";
  } catch (error) {
    console.error('Error getting ID token:', error);
    return undefined;
  }
};

const ProtectedRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    keycloak.init({
      onLoad: 'login-required',
      redirectUri: window.location.href // Redirect to the current page
    }).then((authenticated) => {
      setIsAuthenticated(authenticated);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export { ProtectedRoutes as default, keycloak };