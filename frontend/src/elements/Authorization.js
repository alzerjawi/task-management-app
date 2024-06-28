import { useState } from "react";
import { useCookies } from "react-cookie";

function Authorization() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [loggedIn, setLoggedIn] = useState(true);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [verifyPassword, setVerifyPassword] = useState(null);
  const [fail, setFail] = useState(null);

  console.log(cookies);

  const seeLogin = (status) => {
    setFail(null);
    setLoggedIn(status);
  };

  const handleEnter = async (e, authStatus) => {
    e.preventDefault();
  

    if (!password || (!loggedIn && !email && !username)) {
      setFail('Missing required fields for authentication');
      return;
    }
  

    if (!loggedIn && password !== verifyPassword) {
      setFail('Passwords do not match');
      return;
    }
  

    const credentials = loggedIn
      ? { emailOrUsername: email || username, password }
      : { email, password, username };
  

    console.log('Credentials:', credentials);
  
    const result = await fetch(`http://localhost:8000/${authStatus}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
  
    const data = await result.json();
    console.log('Server Response:', data);
  
    if (data.detail) {
      setFail(data.detail);
    } else {

      setCookie('Email', data.email);
      setCookie('AuthorizationIs', data.token);
  

      if (data.username) {
        setCookie('Username', data.username);
      }


      console.log('Cookies:', cookies);
  
  
      window.location.reload();
    }
  };
  
  
  return (
    <div className="authorization-cont">
      <div className="authorization-cont-box">
        <form>
          <h2>{loggedIn ? 'Log in' : 'Sign up'}</h2>
          {!loggedIn && (
            <>
              <input
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </>
          )}
          {loggedIn && (
            <input
              type="text"
              placeholder="Enter email or username"
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!loggedIn && (
            <input
              type="password"
              placeholder="Verify password"
              onChange={(e) => setVerifyPassword(e.target.value)}
            />
          )}
          <input
            type="submit"
            className="new-user"
            onClick={(e) => handleEnter(e, loggedIn ? 'login' : 'signup')}
          />
          {fail && <p>{fail}</p>}
        </form>
  
        <div className="authorization-choices">
          <button
            onClick={() => seeLogin(false)}
            style={{
              backgroundColor: loggedIn
                ? 'rgb(255, 255, 255)'
                : 'rgb(188, 188, 188)',
            }}
          >
            Sign Up
          </button>
          <button
            onClick={() => seeLogin(true)}
            style={{
              backgroundColor: !loggedIn
                ? 'rgb(255, 255, 255)'
                : 'rgb(188, 188, 188)',
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Authorization;

