import React from 'react';
import Navbar from './Navbar';
import MainContainer from './MainContainer';
import { useEffect, useState } from 'react';

export default function App() {
  const [rerender, setRerender] = useState(false);

  // onMount: grab code param from URL and store
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get('code');
    console.log(codeParam);

    // hold token in local storage
    // allows login creds to persist for longer

    if (codeParam && !localStorage.getItem('accessToken')) {
      console.log('localStorage setter block entered');
      const getAccessToken = async () => {
        await fetch('/getAccessToken?code=' + codeParam, {
          method: 'GET',
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log('App.js getAccessToken log: ' + data);
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
        console.log('data from /getUserData route handler: ' + data);
      });
  };

  return (
    <div>
      <Navbar />
      <MainContainer setRerender={setRerender} />
    </div>
  );
}
