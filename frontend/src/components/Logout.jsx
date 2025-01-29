import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/logout", {
          method: "GET",
          credentials: "include", // Include cookies for logout
        });
        if (response.ok) {
          // Redirect after successful logout
          navigate("/", { replace: true });
        } else {
          console.error("Failed to logout.");
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    logoutUser();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
