import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../utils/api";
import { backendUrl } from "../constant";

const NgoSetup = () => {
  const [name, setName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const navigate = useNavigate();

  const handleNgoSetup = async (e) => {
    e.preventDefault();
    const response = await postData(`${backendUrl}/api/ngos/setup`, {
      name,
      registrationNumber,
      address,
    });
    if (response.success) {
      alert("NGO setup completed!");
      navigate("/");
    } else {
      alert("Failed to complete setup. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">NGO Setup</h1>
      <form className="flex flex-col gap-4" onSubmit={handleNgoSetup}>
        <input
          type="text"
          placeholder="NGO Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          required
        />
        <input
          type="text"
          placeholder="Registration Number"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
          className="input"
          required
        />
        <input
          type="text"
          placeholder="Street"
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
          className="input"
          required
        />
        <input
          type="text"
          placeholder="City"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
          className="input"
          required
        />
        <input
          type="text"
          placeholder="State"
          value={address.state}
          onChange={(e) => setAddress({ ...address, state: e.target.value })}
          className="input"
          required
        />
        <input
          type="text"
          placeholder="Country"
          value={address.country}
          onChange={(e) => setAddress({ ...address, country: e.target.value })}
          className="input"
          required
        />
        <input
          type="number"
          placeholder="Pincode"
          value={address.pincode}
          onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
          className="input"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NgoSetup;
