import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EventForm = () => {
  const { id: eventId } = useParams(); // Extract eventId from URL
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    mobileNumber: "",
    gender: "",
    experience: "",
    skills: "",
  });
  const [volunteerId, setVolunteerId] = useState(null); // Store volunteer ID

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/me", {
          credentials: "include", // Ensures cookies are sent with the request
        });
        const data = await response.json();

        if (response.ok) {
          if (data.role === "Volunteer") {
            setVolunteerId(data._id); // Store the volunteer's ID
          }
        } else {
          console.error("Failed to fetch user data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!volunteerId) {
      alert("Error: Volunteer ID is missing. Please log in.");
      return;
    }

    const response = await fetch(`http://localhost:5000/api/event-form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ...formData, eventId, volunteerId }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Successfully registered for the event!");
      navigate("/"); 
    } else {
      alert(`Error: ${data.error}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Confirm Your Presence</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="mobileNumber"
          placeholder="Mobile Number"
          value={formData.mobileNumber}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Prefer not to disclose">Prefer not to disclose</option>
        </select>
        <textarea
          name="experience"
          placeholder="Your Experience (Optional)"
          value={formData.experience}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="skills"
          placeholder="Your Skills (Optional)"
          value={formData.skills}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EventForm;
