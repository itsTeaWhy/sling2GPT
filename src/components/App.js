import React from 'react';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';
import AppStateContext from './AppStateContext';
import MainContainer from './MainContainer';

export default function App() {
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({});

  // onMount: grab code param from URL and store in LS
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get('code');

    // If no token in LS, get token and store in LS
    if (codeParam && !localStorage.getItem('access_token')) {
      console.log('localStorage setter block entered');
      const getAccessToken = async () => {
        await fetch('/getAccessToken?code=' + codeParam, {
          method: 'GET',
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (data.access_token) {
              localStorage.setItem('access_token', data.access_token);
              setRerender(!rerender);
            }
          });
      };
      getAccessToken();
    }
  }, []);

  //getUserData & update userData
  const getUserData = async () => {
    await fetch('/getUserData', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUserData(data);
        console.log('below is the data from getUserData');
        console.log(data);
      });
  };

  // initial call to GH API
  const CLIENT_ID = '85978a1a65de96401ae0';
  function loginWithGithub() {
    window.location.assign(
      'https://github.com/login/oauth/authorize/?client_id=' + CLIENT_ID
    );
  }

  return (
    <AppStateContext.Provider
      value={{
        rerender,
        setRerender,
        userData,
        setUserData,
        getUserData,
        loginWithGithub,
      }}
    >
      <div>
        <Navbar />
        <MainContainer />
      </div>
    </AppStateContext.Provider>
  );
}
