import React, { useState } from "react";
import styles from "../../style/style";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <section
      className={`${styles.normalFlex} justify-center h-screen w-full bg-slate-100 mt-16`}
    >
      <div className="w-2/5">
        <h1 className="py-5 text-center text-3xl font-bold">
          Login to your account
        </h1>
        <form className={`${styles.form}`}>
          <div>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              onChange={handleChange}
              className={`${styles.input}`}
            />
          </div>
          <div className="mt-2">
            <label htmlFor="">Password </label>
            <input
              type="password"
              onChange={handleChange}
              className={`${styles.input}`}
            />
          </div>
          <div className={`${styles.normalFlex} justify-between mt-2`}>
            <div>
              <input type="checkbox" /> <span>Remember me</span>
            </div>
            <p className="text-blue-600">Forgot your password?</p>
          </div>
          <button
            className="py-2 bg-blue-600 text-white text-[18px] rounded-md mt-4 mb-4"
            type="submit"
          >
            Submit
          </button>
          <NavLink to="/signin">I dont have an account</NavLink>
        </form>
      </div>
    </section>
  );
};

export default Login;
