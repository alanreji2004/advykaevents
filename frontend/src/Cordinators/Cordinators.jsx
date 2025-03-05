import { useState } from "react";
import axios from "axios";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import styles from "./Cordinators.module.css";

const Cordinators = () => {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [coordinator1, setCoordinator1] = useState({ name: "", phone: "" });
  const [coordinator2, setCoordinator2] = useState({ name: "", phone: "" });
  const [googleFormLink, setGoogleFormLink] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleImageUpload = async () => {
    if (!image) return alert("Please select an image");

    setUploading(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "advyka-events");

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dz6dyfijp/image/upload`,
        formData
      );
      setImageUrl(res.data.secure_url);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const docRef = await addDoc(collection(db, "events"), {
        eventName,
        eventDescription,
        eventDate,
        cor1_name: coordinator1.name,
        cor1_num: coordinator1.phone,
        cor2_name: coordinator2.name,
        cor2_num: coordinator2.phone,
        googleFormLink,
        eventPoster: imageUrl,
      });

      alert("Event added successfully!");
      console.log("Document written with ID: ", docRef.id);

      setEventName("");
      setEventDescription("");
      setEventDate("");
      setCoordinator1({ name: "", phone: "" });
      setCoordinator2({ name: "", phone: "" });
      setGoogleFormLink("");
      setImage(null);
      setImageUrl("");
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Add Event</h2>
        <input type="text" placeholder="Event Name" className={styles.input} value={eventName} onChange={(e) => setEventName(e.target.value)} />
        <textarea placeholder="Event Description" className={styles.textarea} value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
        <input type="date" className={styles.input} value={eventDate} onChange={(e) => setEventDate(e.target.value)} />

        <div className={styles.row}>
          <input type="text" placeholder="Coordinator 1 Name" className={styles.input} value={coordinator1.name} onChange={(e) => setCoordinator1({ ...coordinator1, name: e.target.value })} />
          <input type="text" placeholder="Phone" className={styles.input} value={coordinator1.phone} onChange={(e) => setCoordinator1({ ...coordinator1, phone: e.target.value })} />
        </div>

        <div className={styles.row}>
          <input type="text" placeholder="Coordinator 2 Name" className={styles.input} value={coordinator2.name} onChange={(e) => setCoordinator2({ ...coordinator2, name: e.target.value })} />
          <input type="text" placeholder="Phone" className={styles.input} value={coordinator2.phone} onChange={(e) => setCoordinator2({ ...coordinator2, phone: e.target.value })} />
        </div>

        <input type="text" placeholder="Google Form Link" className={styles.input} value={googleFormLink} onChange={(e) => setGoogleFormLink(e.target.value)} />
        <input type="file" className={styles.fileInput} onChange={(e) => setImage(e.target.files[0])} />
        <button type="button" className={styles.uploadButton} onClick={handleImageUpload} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
        <button type="submit" className={styles.submitButton} disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Event"}
        </button>
      </form>
    </div>
  );
};

export default Cordinators;
