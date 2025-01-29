import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../utils/api";

const VolunteerSetup = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [photo, setPhoto] = useState("");
  const [interests, setInterests] = useState("");
  const navigate = useNavigate();

  const handleVolunteerSetup = async (e) => {
    e.preventDefault();
    const response = await postData("/api/volunteers/setup", {
      name,
      age,
      photo,
      interests: interests.split(",").map((interest) => interest.trim()),
    });
    if (response.success) {
      alert("Volunteer setup completed!");
      navigate("/volunteer/dashboard");
    } else {
      alert("Failed to complete setup. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Volunteer Setup</h1>
      <form className="flex flex-col gap-4" onSubmit={handleVolunteerSetup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="input"
          required
        />
        <input
          type="text"
          placeholder="Photo URL"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          className="input"
          required
        />
        <textarea
          placeholder="Your Interests (comma-separated)"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          className="input"
          required
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default VolunteerSetup;
