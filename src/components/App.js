import React from 'react';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';

export default function App() {
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({});

  // onMount: grab code param from URL and store
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get('code');
    console.log(codeParam);

    // hold token in local storage
    // allows login creds to persist for longer

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
            // if successful fetch
            //  set to local storage
            //  force rerender
            if (data.access_token) {
              localStorage.setItem('access_token', data.access_token);
              setRerender(!rerender);
            }
          });
      };
      getAccessToken();
    }
  }, []); // end of useEffect method

  //getUserData
  const getUserData = async () => {
    await fetch('/getUserData', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        setUserData(data);
        console.log('-- USER DATA BELOW --');
        console.log(userData);
      });
  };

  const CLIENT_ID = '85978a1a65de96401ae0';

  function loginWithGithub() {
    window.location.assign(
      'https://github.com/login/oauth/authorize/?client_id=' + CLIENT_ID
    );
  }

  return (
    <div>
      <Navbar />
      <div className='maincontainer'>
        {localStorage.getItem('access_token') ? (
          <>
            <h1>We have the access_token</h1>
            <button className='getdata-bt' onClick={getUserData}>
              GET DATA
            </button>
            <button
              className='github-signout-btn'
              onClick={() => {
                localStorage.removeItem('access_token');
                setRerender(!rerender);
              }}
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <h3>User is not logged in</h3>
            <button className='github-login-btn' onClick={loginWithGithub}>
              Login With Github
            </button>
          </>
        )}
      </div>
    </div>
  );
}
