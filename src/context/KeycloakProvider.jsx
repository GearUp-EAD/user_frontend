// // KeycloakProvider.js
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import Keycloak from 'keycloak-js';

// const KeycloakContext = createContext();

// export const KeycloakProvider = ({ children }) => {
//   const [keycloak, setKeycloak] = useState(null);
//   const [authenticated, setAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const keycloakInstance = new Keycloak({
//       url: 'http://localhost:8081',
//       realm: 'Elite-Gear',
//       clientId: 'Elite-Gear',
//     });

//     keycloakInstance.init({ onLoad: 'check-sso', checkLoginIframe: false }).then((auth) => {
//       setKeycloak(keycloakInstance);
//       setAuthenticated(auth);
//       setLoading(false);
//     });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <KeycloakContext.Provider value={{ keycloak, authenticated }}>
//       {children}
//     </KeycloakContext.Provider>
//   );
// };

// export const useKeycloak = () => useContext(KeycloakContext);
