import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../utils/api";

const DonorSetup = () => {
  const [name, setName] = useState("");
  const [preferredCauses, setPreferredCauses] = useState("");
  const navigate = useNavigate();

  const handleDonorSetup = async (e) => {
    e.preventDefault();
    const response = await postData("/api/donors/setup", {
      name,
      preferredCauses: preferredCauses.split(",").map((cause) => cause.trim()),
    });
    if (response.success) {
      alert("Donor setup completed!");
      navigate("/donor/dashboard");
    } else {
      alert("Failed to complete setup. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Donor Setup</h1>
      <form className="flex flex-col gap-4" onSubmit={handleDonorSetup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          required
        />
        <textarea
          placeholder="Preferred Causes (comma-separated)"
          value={preferredCauses}
          onChange={(e) => setPreferredCauses(e.target.value)}
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

export default DonorSetup;
