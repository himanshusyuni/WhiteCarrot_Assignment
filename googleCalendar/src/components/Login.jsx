import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      localStorage.setItem("accessToken", tokenResponse.access_token);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
    scope: "https://www.googleapis.com/auth/calendar.readonly",
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to Calendar Viewer
        </h1>
        <p className="text-gray-600 mb-6">
          Sign in with Google to view and manage your events!
        </p>
        <button
          onClick={() => login()}
          className="px-6 py-3 bg-blue-500 text-white font-medium rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition"
        >
          Sign in with Google 🚀
        </button>
      </div>
    </div>
  );
};

export default Login;
