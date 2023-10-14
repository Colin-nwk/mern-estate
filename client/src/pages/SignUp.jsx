import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertIcon } from "@chakra-ui/react";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = React.useState({});
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        // Handle successful signup
        console.log(data);
        navigate("/signin");
      } else {
        // Handle signup error
        console.log(data.message);
        setError(data.message);
      }
    } catch (error) {
      // Handle network error

      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <main className="w-full h-screen flex flex-col items-center justify-center px-4 bg-slate-50">
        <div className="max-w-sm w-full text-gray-600 space-y-2 bg-white px-10 my-5 rounded-md">
          <div className="text-center pb-8">
            <div className="mt-5">
              <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                Signup your account
              </h3>
            </div>
          </div>
          {error ? (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          ) : null}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-medium">Username</label>
              <input
                onChange={handleChange}
                type="text"
                required
                name="username"
                id="username"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                onChange={handleChange}
                type="email"
                required
                name="email"
                id="email"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                onChange={handleChange}
                name="password"
                id="password"
                type="password"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>

            <button
              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 disabled:bg-indigo-300"
              disabled={loading}
            >
              {loading ? "loading..." : "  Sign Up"}
            </button>
          </form>
          <OAuth />
          <p className="text-center">
            Have an account?
            <Link
              to="/signin"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign In
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default SignUp;
