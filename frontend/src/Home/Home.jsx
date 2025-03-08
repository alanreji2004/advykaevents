import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Advyka'25</h1>
        <h2 className={styles.subtitle}>The Eminence of Ecstasy</h2>
        <p className={styles.description}>
          Step into the realm of extraordinary events, where creativity meets
          innovation. Whether you're here to manage exhilarating experiences or
          to oversee the grand spectacle, embark on a journey of seamless event
          coordination and administration.
        </p>
        <div className={styles.buttonContainer}>
          <Link to="/adminlogin" className={styles.button}>
            Admin Panel
          </Link>
          <Link to="/organizerlogin" className={styles.button}>
            Organizer Portal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
