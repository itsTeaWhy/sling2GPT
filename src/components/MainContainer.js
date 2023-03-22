import React from 'react';

export default function maincontainer(props) {
  // forward user to github login screen (we pass in the client ID)
  // User is now on the github side and logs in
  // When the user logins, they get forwarded back to the github callback URL
  // EXCEPT: localhost:300/?code=ASDF12345
  // Use code param to get access token (code can only be used once)

  const CLIENT_ID = '85978a1a65de96401ae0';

  function loginWithGithub() {
    window.location.assign(
      'https://github.com/login/oauth/authorize/?client_id=' + CLIENT_ID
    );
  }

  return (
    <div className='maincontainer'>
      {localStorage.getItem('access_token') ? (
        <>
          <h1>We have the access_token</h1>
          <button
            className='github-login-btn'
            onClick={() => {
              localStorage.removeItem('access_token');
              props.setRender(!rerender);
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
  );
}
