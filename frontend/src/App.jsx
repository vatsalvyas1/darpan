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
          <Route path="/dashboard" element={<div>Dashboard Page</div>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
