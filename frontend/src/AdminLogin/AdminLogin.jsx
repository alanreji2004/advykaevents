import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import styles from "./AdminLogin.module.css";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      username === import.meta.env.VITE_ADM_USERNAME &&
      password === import.meta.env.VITE_ADM_PASSWORD
    ) {
      sessionStorage.setItem("isAdminAuthenticated", "true");
      navigate("/admin");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className={styles["admin-login-container"]}>
      <div className={styles["admin-login-box"]}>
        <h2 className={styles["admin-brand"]}>Advyka'25</h2>
        <p className={styles["admin-subtitle"]}>Login As Admin</p>
        <form onSubmit={handleLogin} className={styles["admin-form"]}>
          <input
            type="text"
            placeholder="Username"
            className={styles["admin-input"]}
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
          {error && <p className={styles["admin-error"]}>{error}</p>}
          <button type="submit" className={styles["admin-button"]}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
