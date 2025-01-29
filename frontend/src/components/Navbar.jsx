import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:5000/check-auth", {
          method: "GET",
          credentials: "include", // Ensure cookies are sent with the request
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(data.isAuthenticated);
          setUser(data.isAuthenticated ? data.user : null);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (err) {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        setIsAuthenticated(false);
        setUser(null);
      } else {
        console.error("Failed to log out");
      }
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:underline">
          Samaritan
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
          {!isAuthenticated ? (
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          ) : (
            <>
              <span>
                Welcome, <strong>{user?.name || "User"}</strong>!
              </span>
              <button
                onClick={handleLogout}
                className="hover:underline cursor-pointer"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
