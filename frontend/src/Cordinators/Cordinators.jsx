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

  const handleImageUpload = async () => {
    if (!image) return alert("Please select an image");

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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Add Event</h2>
        <input type="text" placeholder="Event Name" className={styles.input} onChange={(e) => setEventName(e.target.value)} />
        <textarea placeholder="Event Description" className={styles.textarea} onChange={(e) => setEventDescription(e.target.value)} />
        <input type="date" className={styles.input} onChange={(e) => setEventDate(e.target.value)} />

        <div className={styles.row}>
          <input type="text" placeholder="Coordinator 1 Name" className={styles.input} onChange={(e) => setCoordinator1({ ...coordinator1, name: e.target.value })} />
          <input type="text" placeholder="Phone" className={styles.input} onChange={(e) => setCoordinator1({ ...coordinator1, phone: e.target.value })} />
        </div>

        <div className={styles.row}>
          <input type="text" placeholder="Coordinator 2 Name" className={styles.input} onChange={(e) => setCoordinator2({ ...coordinator2, name: e.target.value })} />
          <input type="text" placeholder="Phone" className={styles.input} onChange={(e) => setCoordinator2({ ...coordinator2, phone: e.target.value })} />
        </div>

        <input type="text" placeholder="Google Form Link" className={styles.input} onChange={(e) => setGoogleFormLink(e.target.value)} />
        <input type="file" className={styles.fileInput} onChange={(e) => setImage(e.target.files[0])} />
        <button type="button" className={styles.uploadButton} onClick={handleImageUpload}>Upload Image</button>
        <button type="submit" className={styles.submitButton}>Submit Event</button>
      </form>
    </div>
  );
};

export default Cordinators;
