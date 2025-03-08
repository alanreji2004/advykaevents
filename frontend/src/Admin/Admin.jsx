import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import styles from "./Admin.module.css";

const Admin = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, "events"));
      const eventList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventList);
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (confirmDelete) {
      await deleteDoc(doc(db, "events", id));
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  const filteredEvents = events.filter((event) =>
    event.eventName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.adminContainer}>
      <h1 className={styles.adminTitle}>Manage Events</h1>
      <input
        type="text"
        placeholder="Search events..."
        className={styles.searchInput}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className={styles.eventsGrid}>
        {filteredEvents.map((event) => (
          <div key={event.id} className={styles.eventCard}>
            <span className={styles.eventName}>{event.eventName}</span>
            <div className={styles.buttonGroup}>
              <button className={styles.editButton} onClick={() => navigate(`/admin/edit/${event.id}`)}>
                <FiEdit2 size={18} /> Edit
              </button>
              <button className={styles.deleteButton} onClick={() => handleDelete(event.id)}>
                <FiTrash2 size={18} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
