import React, { useState } from "react";
import styles from "../../style/style.js";
import { Link, useNavigate } from "react-router-dom";
import {
  signinStart,
  signinSuccess,
  signinFailure,
} from "../../redux/user/userSlice.js";
import { useSelector, useDispatch } from "react-redux";
import OAuth from "../../components/OAuth.jsx";

const Login = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signinStart());
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signinFailure(data.message));
        return;
      }
      dispatch(signinSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signinFailure(error.message));
    }
  };
  return (
    <section className={`${styles.normalFlex} justify-center h-screen w-full `}>
      <div className="w-2/5">
        <h1 className="py-5 text-center text-3xl font-bold">
          Login to your account
        </h1>
        <form onSubmit={handleSubmit} className={`${styles.form}`}>
          <div>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              onChange={handleChange}
              className={`${styles.input}`}
              id="email"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="password">Password </label>
            <input
              type="password"
              onChange={handleChange}
              className={`${styles.input}`}
              id="password"
            />
          </div>
          <div className={`${styles.normalFlex} justify-between mt-2`}>
            <div>
              <input type="checkbox" /> <span>Remember me</span>
            </div>
            <p className="text-blue-600">Forgot your password?</p>
          </div>
          <button
            className="py-2 bg-blue-600 text-white text-[18px] rounded-md mt-3 mb-3"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading" : "Log In"}
          </button>
          <OAuth />
          <Link to="/signin">I dont have an account</Link>{" "}
          {error && <p className="text-red-500 mt-1">{error}</p>}
        </form>
      </div>
    </section>
  );
};

export default Login;
