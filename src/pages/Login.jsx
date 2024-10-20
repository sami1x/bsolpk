import React, { useState, useEffect } from "react";
import LoginForm from "@/components/LoginForm";

const Login = () => {
  return (
    <div className=" bg-[url(/bg.jpeg)] h-screen bg-cover bg-center">
      <div className="w-full h-full flex items-center justify-center">
        <div className="max-w-[450px] w-full bg-white p-10 rounded-2xl bg-opacity-80">
          <h1 className="font-forheading text-[#053976] text-4xl font-medium text-center">
            Blackstone International Teaching Centre
          </h1>
          <h1 className="font-forheading text-[#870808] text-2xl font-semibold text-center py-3">
            Welcome
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
