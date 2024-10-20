import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const Home = () => {
  const userJSON = localStorage.getItem("authToken");
  const navigate = useNavigate();

  let userData;

  try {
    userData = userJSON ? JSON.parse(userJSON) : null; // Safely parse JSON
  } catch (error) {
    console.error("Invalid token in localStorage:", error);
    userData = null;
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  if (!userData) {
    return <div>Please log in</div>;
  }

  // Check the role and display appropriate message
  const renderContentForRole = () => {
    switch (userData.role) {
      case "admin":
        return <div className="text-3xl ">Welcome to Admin portal</div>;
      case "teacher":
        return <div className="text-3xl ">Welcome to Teacher portal</div>;
      case "student":
        return <div className="text-3xl ">Welcome to Student portal</div>;
      default:
        return <div className="text-3xl ">Role not recognized</div>;
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center flex-col">
        {renderContentForRole()}
        <div className="text-xl py-4">{userData.username} is logged in</div>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </>
  );
};

export default Home;
