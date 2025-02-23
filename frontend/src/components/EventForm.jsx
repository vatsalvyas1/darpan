import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserCheck, Calendar, Phone, User, BookOpen, Lightbulb } from 'lucide-react';
import { useNavigate } from "react-router-dom";


const EventForm = () => {
  const navigate = useNavigate();
  const { id: eventId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    mobileNumber: "",
    gender: "",
    experience: "",
    skills: "",
  });
  const [volunteerId, setVolunteerId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/me", {
          credentials: "include",
        });
        const data = await response.json();

        if (response.ok) {
          if (data.role === "Volunteer") {
            setVolunteerId(data._id);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden">
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-8">
          <h2 className="text-3xl font-extrabold text-white text-center">
            Confirm Your Presence
          </h2>
          <p className="text-violet-100 text-center mt-2">Join us for this amazing event</p>
        </div>
        
        <form onSubmit={handleSubmit} className="px-8 py-10 space-y-6">
          <div className="space-y-5">
            <div className="relative group">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-500 h-5 w-5 transition-colors group-focus-within:text-violet-600" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200 outline-none bg-slate-50/50"
              />
            </div>
            
            <div className="relative group">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-500 h-5 w-5 transition-colors group-focus-within:text-violet-600" />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200 outline-none bg-slate-50/50"
              />
            </div>
            
            <div className="relative group">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-500 h-5 w-5 transition-colors group-focus-within:text-violet-600" />
              <input
                type="text"
                name="mobileNumber"
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200 outline-none bg-slate-50/50"
              />
            </div>
            
            <div className="relative group">
              <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-500 h-5 w-5 transition-colors group-focus-within:text-violet-600" />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200 outline-none bg-slate-50/50 appearance-none cursor-pointer"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to disclose">Prefer not to disclose</option>
              </select>
            </div>
            
            <div className="relative group">
              <BookOpen className="absolute left-3 top-4 text-violet-500 h-5 w-5 transition-colors group-focus-within:text-violet-600" />
              <textarea
                name="experience"
                placeholder="Your Experience (Optional)"
                value={formData.experience}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200 outline-none min-h-[120px] resize-y bg-slate-50/50"
              />
            </div>
            
            <div className="relative group">
              <Lightbulb className="absolute left-3 top-4 text-violet-500 h-5 w-5 transition-colors group-focus-within:text-violet-600" />
              <textarea
                name="skills"
                placeholder="Your Skills (Optional)"
                value={formData.skills}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200 outline-none min-h-[120px] resize-y bg-slate-50/50"
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 transform hover:translate-y-[-2px] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 active:translate-y-[0px]"
          >
            Submit Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;