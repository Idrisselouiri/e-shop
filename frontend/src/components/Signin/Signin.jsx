import React, { useState } from "react";
import styles from "../../style/style";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <section
      className={`${styles.normalFlex} justify-center min-h-screen w-full bg-slate-100 mt-24`}
    >
      <div className="w-2/5">
        <h1 className="py-3 text-center text-3xl font-bold">
          Register as a new user
        </h1>
        <form onSubmit={handleSubmit} className={`${styles.form}`}>
          <div>
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              onChange={handleChange}
              className={`${styles.input}`}
              id="username"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="email">Email address</label>
            <input
              type="text"
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
              className={`${styles.input} appearance-none`}
              id="password"
            />
          </div>
          <button
            className="py-2 bg-blue-600 text-white text-[18px] rounded-md mt-3 mb-3"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading" : "Sign In"}
          </button>
          <Link to="/login">I have an account</Link>
          {error && <p className="text-red-500 mt-1">{error}</p>}
        </form>
      </div>
    </section>
  );
};

export default Signin;
