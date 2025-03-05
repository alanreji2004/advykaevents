import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; 
import styles from "./OrganizerLogin.module.css";

const OrganizerLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      username === import.meta.env.VITE_ORG_USERNAME &&
      password === import.meta.env.VITE_ORG_PASSWORD
    ) {
      sessionStorage.setItem("isAuthenticated", "true");
      navigate("/addevents");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className={styles["organizer-login-container"]}>
      <div className={styles["organizer-login-box"]}>
        <h2 className={styles["organizer-brand"]}>Advyka'25</h2>
        <p className={styles["organizer-subtitle"]}>Login as Organizer</p>
        <form onSubmit={handleLogin} className={styles["organizer-form"]}>
          <input
            type="text"
            placeholder="Username"
            className={styles["organizer-input"]}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className={styles["password-container"]}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={styles["password-input"]}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className={styles["password-toggle"]}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {error && <p className={styles["organizer-error"]}>{error}</p>}
          <button type="submit" className={styles["organizer-button"]}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrganizerLogin;
