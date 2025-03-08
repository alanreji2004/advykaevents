import { useState } from "react";
import axios from "axios";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import styles from "./Cordinators.module.css";

const Cordinators = () => {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventType, setEventType] = useState(""); // New State for Event Type
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
    if (
      !eventName ||
      !eventDescription ||
      !eventDate ||
      !eventType || 
      !coordinator1.name ||
      !coordinator1.phone ||
      !googleFormLink ||
      !imageUrl
    ) {
      alert("Please fill in all required fields!");
      return;
    }
    setSubmitting(true);

    try {
      const docRef = await addDoc(collection(db, "events"), {
        eventName,
        eventDescription,
        eventDate,
        eventType,
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
      setEventType("");
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
        <h2 className={styles.title}>Advyka'25</h2>

        <label className={styles.label}>Enter Event Name & Description</label>
        <input
          type="text"
          placeholder="Event Name"
          className={styles.input}
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <textarea
          placeholder="Event Description"
          className={styles.textarea}
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        />

        <label className={styles.label}>Enter Event Date</label>
        <input
          type="date"
          className={styles.input}
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />

        <label className={styles.label}>Select Event Type</label>
        <select
          className={styles.select}
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        >
          <option value="">Select an option</option>
          <option value="competition">Competition</option>
          <option value="workshop">Workshop</option>
          <option value="event">Event</option>
        </select>

        <label className={styles.label}>Enter Coordinators' Details</label>
        <div className={styles.row}>
          <input
            type="text"
            placeholder="Coordinator 1 Name"
            className={styles.input}
            value={coordinator1.name}
            onChange={(e) =>
              setCoordinator1({ ...coordinator1, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Phone Number"
            className={styles.input}
            value={coordinator1.phone}
            onChange={(e) =>
              setCoordinator1({ ...coordinator1, phone: e.target.value })
            }
          />
        </div>

        <div className={styles.row}>
          <input
            type="text"
            placeholder="Coordinator 2 Name"
            className={styles.input}
            value={coordinator2.name}
            onChange={(e) =>
              setCoordinator2({ ...coordinator2, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Phone Number"
            className={styles.input}
            value={coordinator2.phone}
            onChange={(e) =>
              setCoordinator2({ ...coordinator2, phone: e.target.value })
            }
          />
        </div>

        <label className={styles.label}>Enter Form Link</label>
        <input
          type="text"
          placeholder="Google Form Link"
          className={styles.input}
          value={googleFormLink}
          onChange={(e) => setGoogleFormLink(e.target.value)}
        />

        <label className={styles.label}>Upload Event Poster</label>
        <input
          type="file"
          className={styles.fileInput}
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          type="button"
          className={styles.uploadButton}
          onClick={handleImageUpload}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Event"}
        </button>
      </form>
    </div>
  );
};

export default Cordinators;
