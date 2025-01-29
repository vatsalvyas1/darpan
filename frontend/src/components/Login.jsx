import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    window.location.href = "http://localhost:5000/auth/google/"; 
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Redirecting to Google Login...</h1>
    </div>
  );
};

export default Login;
