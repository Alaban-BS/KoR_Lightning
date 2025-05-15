import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../styles/Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(true);
  const router = useRouter();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) {
      localStorage.setItem("authenticated", "true"); // Store authentication status
      setSubmitted(true);
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const handleAccessClick = () => {
    localStorage.setItem("authenticated", "true");
    window.dispatchEvent(new Event("storage")); // Notify other components about login
    router.push("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {!submitted ? (
          <>
            <h1>Lightning Fast Ordering</h1>
            <h2>King of Reach</h2>
            <p>Enter your email to get access.</p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={!valid ? "error" : ""}
                required
              />
              {!valid && (
                <p className="error-message">Please enter a valid email.</p>
              )}
              <button type="submit">Request Access</button>
            </form>
          </>
        ) : (
          <>
            <h2>Check your email</h2>
            <p>A temporary access link has been sent to your email.</p>
            <button onClick={handleAccessClick} className="access-link">
              Click here to access
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
