import { useEffect } from "react";
import { backendUrl } from "../constant";

const Login = () => {
  useEffect(() => {
    const redirectUrl = `${backendUrl}/auth/google`;
    console.log("Redirecting to:", redirectUrl); // Debugging
    window.location.href = redirectUrl;
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Redirecting to Google Login...</h1>
    </div>
  );
};

export default Login;
