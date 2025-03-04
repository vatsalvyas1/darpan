import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import NgoSetup from "./components/NgoSetup";
import VolunteerSetup from "./components/VolunteerSetup";
import DonorSetup from "./components/DonorSetup";
import Homepage from "./components/HomePage";
import Logout from "./components/Logout";
import FrontPage from "./components/FrontPage";
import OurTeam from "./components/OurTeam";
import CreateDonation from "./components/CreateDonation";
import DonationDetails from "./components/DonationDetails";
import Profile from "./components/Profile";
import CreateEvent from "./components/CreateEvent";
import EventDetails from "./components/EventDetails";
import EventForm from "./components/EventForm";
import DonationForm from "./components/DonationForm";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ngo/setup" element={<NgoSetup />} />
          <Route path="/volunteer/setup" element={<VolunteerSetup />} />
          <Route path="/donor/setup" element={<DonorSetup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/create-donation" element={<CreateDonation />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/donation/:id" element={<DonationDetails />} />
          <Route path="/donation-form/:id" element={<DonationForm />} />
          <Route path="/event-form/:id" element={<EventForm />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path= "/team" element={<OurTeam/>} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
