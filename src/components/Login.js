import { useRef, useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthProvider";
import axios from "../api/axios";
import Home from "./Home";
import { Navigate, useNavigate, useLocation, Link } from "react-router-dom";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const LOGIN_URL = "/auth";
  const { auth, setAuth } = useAuthContext();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          id="username"
          autoComplete="false"
          ref={userRef}
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          autoComplete="false"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        <button>Sign In</button>
      </form>
      <p>
        Already login?
        <br />
        <span className="line">
          {/*put router link here*/}
          <a href="/register">Register</a>
        </span>
      </p>
    </section>
  );
};
export default Login;
