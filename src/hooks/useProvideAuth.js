import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import routes from '../routes';
import mainApi from '../utils/MainApi';

// Provider hook that creates auth object and handles state
// https://usehooks.com/useAuth/
const useProvideAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(null);

  const handleSignIn = (email, password) =>
    mainApi.signIn({ email, password }).then((data) => {
      const jwt = data.token;
      if (jwt) {
        localStorage.setItem('jwt', jwt);
        setLoggedIn(true);
        navigate(routes.movies);
      }
    });

  const handleSignUp = (email, password, name) =>
    mainApi.signUp({ email, password, name }).then((res) => {
      if (res) {
        handleSignIn(email, password);
      }
    });

  const handleSignOut = (cb) => {
    cb();
    setLoggedIn(false);
    navigate(routes.main);
  };

  const handleUpdateProfile = (profileData) => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return Promise.reject(new Error('Токен не передан или передан не в том формате'));
    }

    return mainApi.updateUserInfo(jwt, profileData).then((res) => {
      setUser(res);
    });
  };

  useEffect(() => {
    const unsubscribe = () => {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        mainApi.getUserInfo(jwt).then((res) => {
          if (res) {
            setLoggedIn(true);
            setUser(res);
          } else {
            setLoggedIn(false);
          }
        });
      } else {
        setLoggedIn(false);
      }
    };
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return {
    user,
    loggedIn,
    handleSignUp,
    handleSignIn,
    handleSignOut,
    handleUpdateProfile,
  };
};

export default useProvideAuth;
