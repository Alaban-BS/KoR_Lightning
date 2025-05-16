import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(true);
  const router = useRouter();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (email) {
      setValid(true);
      setSubmitted(true);
      // Handle login logic here
      router.push("/dashboard");
    } else {
      setValid(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {!valid && <div className="error">Please enter a valid email</div>}
        {submitted && <div className="success">Login successful!</div>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="login-input"
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
