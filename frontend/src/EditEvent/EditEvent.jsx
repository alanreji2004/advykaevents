import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import axios from "axios";
import styles from "./EditEvent.module.css";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [changesMade, setChangesMade] = useState(false);
  const adminDepartment = sessionStorage.getItem("adminDepartment"); 

  useEffect(() => {
    const fetchEvent = async () => {
      const docRef = doc(db, "events", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const eventDetails = docSnap.data();

        if (eventDetails.department.toUpperCase() !== adminDepartment) {
          alert("You are not authorized to edit this event.");
          navigate("/admin");
          return;
        }

        setEventData(eventDetails);
        setUpdatedData(eventDetails);
      } else {
        alert("Event not found!");
        navigate("/admin");
      }
    };

    fetchEvent();
  }, [id, navigate, adminDepartment]);

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
    setChangesMade(true);
  };

  const handleImageUpload = async () => {
    if (!imageFile) return alert("Please select an image");

    setUploading(true);
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "advyka-events");

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dz6dyfijp/image/upload`,
        formData
      );

      setUpdatedData({ ...updatedData, eventPoster: res.data.secure_url });
      setChangesMade(true);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!changesMade) return;

    const docRef = doc(db, "events", id);
    try {
      const updates = {};
      Object.keys(updatedData).forEach((key) => {
        if (updatedData[key] !== eventData[key]) {
          updates[key] = updatedData[key];
        }
      });

      if (Object.keys(updates).length > 0) {
        await updateDoc(docRef, updates);
        alert("Event updated successfully!");
      } else {
        alert("No changes made.");
      }

      navigate("/admin");
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event.");
    }
  };

  if (!eventData) return <p className={styles.loadingText}>Loading...</p>;

  return (
    <div className={styles.editContainer}>
      <h1 className={styles.editTitle}>Edit Event</h1>

      <label className={styles.label}>Event Name</label>
      <input
        type="text"
        name="eventName"
        className={styles.input}
        value={updatedData.eventName}
        onChange={handleChange}
      />

      <label className={styles.label}>Event Description</label>
      <textarea
        name="eventDescription"
        className={styles.textarea}
        value={updatedData.eventDescription}
        onChange={handleChange}
      />

      <label className={styles.label}>Event Date</label>
      <input
        type="date"
        name="eventDate"
        className={styles.input}
        value={updatedData.eventDate}
        onChange={handleChange}
      />

      <label className={styles.label}>Event Type</label>
      <select
        name="eventType"
        className={styles.select}
        value={updatedData.eventType}
        onChange={handleChange}
      >
        <option value="competition">Competition</option>
        <option value="workshop">Workshop</option>
        <option value="event">Event</option>
      </select>

      <label className={styles.label}>Google Form Link</label>
      <input
        type="text"
        name="googleFormLink"
        className={styles.input}
        value={updatedData.googleFormLink}
        onChange={handleChange}
      />

      <label className={styles.label}>Coordinator 1</label>
      <input
        type="text"
        name="cor1_name"
        className={styles.input}
        value={updatedData.cor1_name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="cor1_num"
        className={styles.input}
        value={updatedData.cor1_num}
        onChange={handleChange}
      />

      <label className={styles.label}>Coordinator 2</label>
      <input
        type="text"
        name="cor2_name"
        className={styles.input}
        value={updatedData.cor2_name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="cor2_num"
        className={styles.input}
        value={updatedData.cor2_num}
        onChange={handleChange}
      />

      <label className={styles.label}>Event Poster</label>
      <img src={updatedData.eventPoster} alt="Event Poster" className={styles.preview} />
      <input type="file" className={styles.fileInput} onChange={(e) => setImageFile(e.target.files[0])} />
      <button className={styles.uploadButton} onClick={handleImageUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload New Image"}
      </button>

      <button className={styles.saveButton} onClick={handleSave} disabled={!changesMade}>
        Save Changes
      </button>
    </div>
  );
};

export default EditEvent;
