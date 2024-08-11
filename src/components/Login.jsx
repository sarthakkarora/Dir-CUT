import React, { useState } from "react";
import Image from "../assets/image.jpg";
import Logo from "../assets/logo.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("user");
  const [techCode, setTechCode] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); 
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => { 
    setName(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required'; 
    if (!email.includes('@')) newErrors.email = 'Invalid email address';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (userType === 'tech' && !techCode) newErrors.techCode = 'Tech Code is required';
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      alert("Login successful");
    }
  };

  const getPasswordStrength = (password) => {
    if (password.length < 6) return 'Weak';
    if (password.length < 12) return 'Medium';
    return 'Strong';
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="Background" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="login-center">
            <h2>Welcome!</h2>
            <p>Please enter your details</p>
            <form onSubmit={handleSubmit}>
             
              <select
                value={userType}
                onChange={handleUserTypeChange}
                className="user-type-select"
                aria-label="Select user type"
              >
                <option value="user">User</option>
                <option value="tech">Technical Person</option>
              </select>

              {userType === "tech" && (
                <input
                  type="text"
                  placeholder="Enter Tech Code"
                  value={techCode}
                  onChange={(e) => setTechCode(e.target.value)}
                  className="tech-code-input show"
                  aria-label="Tech Code"
                />
              )}
              {errors.techCode && <p className="error-text">{errors.techCode}</p>}
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
                aria-label="Name"
              />
              {errors.name && <p className="error-text">{errors.name}</p>}

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                aria-label="Email"
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  aria-label="Password"
                />
                {errors.password && <p className="error-text">{errors.password}</p>}
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Hide password"
                  />
                ) : (
                  <FaEye
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Show password"
                  />
                )}
                <div className={`password-strength-meter ${passwordStrength.toLowerCase()}`}>
                  Password Strength: {passwordStrength}
                </div>
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label htmlFor="remember-checkbox">
                    Remember for 30 days
                  </label>
                </div>
                <a href="#" className="forgot-pass-link">
                  Forgot password?
                </a>
              </div>
              <div className="login-center-buttons">
                <button type="submit" disabled={loading}>
                  {loading ? "Loading..." : "Log In"}
                </button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Don't have an account? <a href="#">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
