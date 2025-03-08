import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import styles from "./AdminLogin.module.css";

const adminCredentials = {
  admin_cse: {
    username: import.meta.env.VITE_ADM_CSE_USERNAME,
    password: import.meta.env.VITE_ADM_CSE_PASSWORD,
    department: "CSE",
  },
  admin_ece: {
    username: import.meta.env.VITE_ADM_ECE_USERNAME,
    password: import.meta.env.VITE_ADM_ECE_PASSWORD,
    department: "ECE",
  },
  admin_eee: {
    username: import.meta.env.VITE_ADM_EEE_USERNAME,
    password: import.meta.env.VITE_ADM_EEE_PASSWORD,
    department: "EEE",
  },
  admin_mech: {
    username: import.meta.env.VITE_ADM_MECH_USERNAME,
    password: import.meta.env.VITE_ADM_MECH_PASSWORD,
    department: "MECH",
  },
};

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    for (const key in adminCredentials) {
      if (
        username === adminCredentials[key].username &&
        password === adminCredentials[key].password
      ) {
        sessionStorage.setItem("isAdminAuthenticated", "true");
        sessionStorage.setItem("adminDepartment", adminCredentials[key].department);
        navigate("/admin");
        return;
      }
    }
    setError("Invalid username or password");
  };

  return (
    <div className={styles.adminLoginContainer}>
      <div className={styles.adminLoginBox}>
        <h2 className={styles.adminBrand}>Advyka'25</h2>
        <p className={styles.adminSubtitle}>Login As Admin</p>
        <form onSubmit={handleLogin} className={styles.adminForm}>
          <input
            type="text"
            placeholder="Username"
            className={styles.adminInput}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={styles.passwordInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {error && <p className={styles.adminError}>{error}</p>}
          <button type="submit" className={styles.adminButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
