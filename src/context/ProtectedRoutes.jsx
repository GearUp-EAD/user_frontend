import React, { useState, useEffect } from 'react';
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
      console.error('Keycloak is not authenticated');
      return;
    }
    await keycloak.logout();
    console.log("log out called");

    localStorage.removeItem('user-settings'); // Example
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

// Login function
export const login = async () => {
  try {
    if (!keycloak.initialized) {
      await keycloak.init({
        onLoad: 'login-required',
        checkLoginIframe: false,
        
      });
    }

    if (keycloak.authenticated) {
      console.log('User authenticated');
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

// Function to get ID token
export const getIdToken = () => {
  try {
    if (!keycloak.authenticated) {
      console.warn('User not authenticated');
      return "not authenticated";
    }
    console.log("in the id token retrieve function");
    console.log(keycloak.idToken);
    console.log('User authenticated');
      localStorage.setItem('access-token', keycloak.token);
      localStorage.setItem('refresh-token', keycloak.refreshToken);
    return "authenticated";

  } catch (error) {
    console.error('Error getting ID token:', error);
    return undefined;
  }
};

const ProtectedRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Only initialize Keycloak if it hasn't been initialized yet
    if (!initialized) {
      keycloak.init({ onLoad: 'login-required' })
        .then((authenticated) => {
          setIsAuthenticated(authenticated);
          setInitialized(true);
          setLoading(false);
          console.log("in the id token retrieve function");
      localStorage.setItem('access-token', keycloak.token);
      localStorage.setItem('refresh-token', keycloak.refreshToken);
          console.log('keycloak initizlized')
        })
        .catch((error) => {
          console.error('Keycloak initialization failed:', error);
          setLoading(false);
        });
    }
  }, [initialized]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/public" />;
};

export { ProtectedRoutes as default, keycloak };
