import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import { Button, Label, TextInput } from "flowbite-react";
import FlashLogo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const SignupPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    // Your login logic (fake validation for now)
    if (firstName && lastName && email && password && confirmPassword) {
      console.log({ firstName, lastName, email, password, confirmPassword });
      navigate("/dashboard"); // Navigate to dashboard
    } else {
      // Optionally show error
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="space-y-6">
          <div className="text-center">
            <img className="mx-auto" src={FlashLogo} alt="Flowbite" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white mt-4">
              Sign up for an account
            </h1>
          </div>

          <form className="space-y-4" onSubmit={handleSignup}>
            <div>
              <Label htmlFor="firstName" />
              <TextInput
                id="firstName"
                type="text"
                placeholder="John"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="lastName" />
              <TextInput
                id="lastName"
                type="text"
                placeholder="Doe"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email" />
              <TextInput
                id="email"
                type="email"
                placeholder="name@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password" />
              <TextInput
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword" />
              <TextInput
                id="confirmPassword"
                type="confirmPassword"
                placeholder="Re-enter your password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full">
              Sign up
            </Button>

            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              Already have an account yet?{" "}
              <Link
                to="/"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
