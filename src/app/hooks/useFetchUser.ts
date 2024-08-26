import { useState, useEffect } from 'react';
import { jwtToken } from '@/src/app/services/auth';
import Cookies from 'js-cookie';

export default function useFetchUser() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('token');
      if (token) {
        const jwt = new jwtToken();
        const userData = await jwt.valid(token);
        if (userData) {
          setUser(userData);
        } else {
          console.log('Invalid token');
        }
      } else {
        console.log('No token found');
      }
      setLoadingUser(false);
    };

    fetchUser();
  }, []);

  return { user, loadingUser };
}
