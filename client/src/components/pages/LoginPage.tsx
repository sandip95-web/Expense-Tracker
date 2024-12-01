import { Link } from "react-router-dom";
import { useState } from "react";
import InputField from "../common/InputField";
import { Login } from "../../types/types";

const LoginPage = () => {
  const [loginData, setLoginData] = useState<Login>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loginData);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-900">
      <div className="bg-white shadow-lg rounded-3xl overflow-hidden max-w-md w-full">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
            Welcome Back!
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Log in to your account to continue.
          </p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputField
              label="Email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
            />
            <InputField
              label="Password"
              id="password"
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-700 via-blue-600 to-indigo-700 p-6 text-center">
          <p className="text-sm text-gray-300">
            By logging in, you agree to our{" "}
            <a href="#" className="text-white hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-white hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
