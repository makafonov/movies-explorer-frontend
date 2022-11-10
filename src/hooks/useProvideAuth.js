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
    mainApi.signIn({ email, password }).then((res) => {
      const jwt = res.token;
      if (jwt) {
        localStorage.setItem('jwt', jwt);
        setLoggedIn(true);
        navigate(routes.movies);
      }
    });

  const handleSignUp = (email, password, name) =>
    mainApi.signUp({ email, password, name }).then(() => {
      handleSignIn(email, password);
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

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi
        .getUserInfo(jwt)
        .then((res) => {
          setLoggedIn(true);
          setUser(res);
        })
        .catch(() => {
          setLoggedIn(false);
          localStorage.removeItem('jwt');
        });
    } else {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt && loggedIn) {
      mainApi
        .getUserInfo(jwt)
        .then((res) => {
          setUser(res);
        })
        .catch(() => {
          setLoggedIn(false);
          localStorage.removeItem('jwt');
        });
    }
    if (!jwt) {
      setLoggedIn(false);
    }
  }, [loggedIn]);

  return {
    user,
    loggedIn,
    handleSignUp,
    handleSignIn,
    handleSignOut,
    handleUpdateProfile,
    checkToken,
  };
};

export default useProvideAuth;
