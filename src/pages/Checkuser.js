import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Keycloak from 'keycloak-js';

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
        const accessToken = localStorage.getItem('access-token');

        console.log(accessToken);
      try {
        const response = await axios.get('http://localhost:8080/api/customers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCustomers(response.data);
      } catch (error) {
        console.error('There was an error fetching the customers!', error);
      }
    };

    fetchCustomers();
  }, [token]);

  return (
    <div>
      bksadbkasnfksan
    </div>
  );
};

export default CustomersList;
