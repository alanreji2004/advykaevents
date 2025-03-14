import { useState } from "react";
import axios from "axios";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import styles from "./Cordinators.module.css";

const Cordinators = () => {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [department, setDepartment] = useState(""); 
  const [eventType, setEventType] = useState("");
  const [coordinator1, setCoordinator1] = useState({ name: "", phone: "" });
  const [coordinator2, setCoordinator2] = useState({ name: "", phone: "" });
  const [googleFormLink, setGoogleFormLink] = useState("");
  const [isOpenEvent, setIsOpenEvent] = useState(false);
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
      !department || 
      !eventType || 
      !coordinator1.name ||
      !coordinator1.phone ||
      (!isOpenEvent && !googleFormLink) || 
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
        department,
        eventType,
        cor1_name: coordinator1.name,
        cor1_num: coordinator1.phone,
        cor2_name: coordinator2.name,
        cor2_num: coordinator2.phone,
        googleFormLink: isOpenEvent ? "" : googleFormLink,
        eventPoster: imageUrl,
        isOpenEvent,
      });

      alert("Event added successfully!");
      console.log("Document written with ID: ", docRef.id);

      setEventName("");
      setEventDescription("");
      setEventDate("");
      setDepartment("");
      setEventType("");
      setCoordinator1({ name: "", phone: "" });
      setCoordinator2({ name: "", phone: "" });
      setGoogleFormLink("");
      setIsOpenEvent(false);
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

        <label className={styles.label}>Select Department</label>
        <select
          className={styles.select}
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Select Department</option>
          <option value="CSE">CSE & AI</option>
          <option value="ECE">ECE & ECS</option>
          <option value="EEE">EEE</option>
          <option value="MECH">MECH</option>
          <option value="COMMON">COMMON</option>
        </select>

        <label className={styles.label}>Select Event Type</label>
        <select
          className={styles.select}
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        >
          <option value="">Select Event Type</option>
          <option value="competition">Competition</option>
          <option value="workshop">Workshop</option>
          <option value="event">Event</option>
          <option value="expo">Expo</option>
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

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="openEvent"
            checked={isOpenEvent}
            onChange={() => {
              setIsOpenEvent(!isOpenEvent);
              if (!isOpenEvent) setGoogleFormLink("");
            }}
          />
          <label htmlFor="openEvent">Open Event (No Registration)</label>
        </div>

        <label className={styles.label}>Enter Form Link</label>
        <input
          type="text"
          placeholder="Google Form Link"
          className={styles.input}
          value={googleFormLink}
          onChange={(e) => setGoogleFormLink(e.target.value)}
          disabled={isOpenEvent}
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
