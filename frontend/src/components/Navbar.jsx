import { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:5000/check-auth", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(data.isAuthenticated);
          setUser(data.user || null);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (err) {
        console.error("Error checking auth:", err);
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  // Handle logout
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
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-3xl font-bold text-primary">
              Darpan
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Support Our Causes Dropdown */}
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex items-center text-gray-700 hover:text-gray-900">
                Support Our Causes
                <ChevronDownIcon className="h-5 w-5 ml-1" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute left-0 z-10 mt-2 w-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      TO OUR MONTHLY MISSIONS
                    </h3>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/donate/children"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-3 py-2 rounded-md text-sm"
                            )}
                          >
                            No Child Orphaned
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/donate/hunger"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-3 py-2 rounded-md text-sm"
                            )}
                          >
                            Feed the Hungry
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Other Links */}
            <Link to="/csr" className="text-gray-700 hover:text-gray-900">
              CSR
            </Link>
            <Link to="/ngos" className="text-gray-700 hover:text-gray-900">
              Discover NGOs
            </Link>

            {/* About Dropdown */}
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex items-center text-gray-700 hover:text-gray-900">
                About
                <ChevronDownIcon className="h-5 w-5 ml-1" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/about"
                          className={classNames(
                            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Our Story
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/Team"
                          className={classNames(
                            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Our Team
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Authentication Buttons */}
            {isAuthenticated ? (
              <>
                <span className="text-gray-700">Welcome, {user?.name}!</span>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-gray-900"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
          <div className="px-4 py-3 space-y-2">
            <Link
              to="/donate"
              className="block px-3 py-2 text-gray-900 hover:bg-gray-100"
            >
              Support Our Causes
            </Link>
            <Link
              to="/csr"
              className="block px-3 py-2 text-gray-900 hover:bg-gray-100"
            >
              CSR
            </Link>
            <Link
              to="/ngos"
              className="block px-3 py-2 text-gray-900 hover:bg-gray-100"
            >
              Discover NGOs
            </Link>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="block px-3 py-2 text-gray-900 hover:bg-gray-100"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 text-gray-900 hover:bg-gray-100"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}