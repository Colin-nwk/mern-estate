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
      <main className="relative py-6 bg-gray-900 h-screen">
        <div className="relative z-10 max-w-screen-xl mx-auto text-gray-600 sm:px-4 md:px-8">
          <div className="max-w-lg space-y-3 px-4 sm:mx-auto sm:text-center sm:px-0">
            <h3 className="text-cyan-400 font-semibold">
              {" "}
              Signup your account
            </h3>
          </div>

          <div className="flex justify-center">
            <div className="max-w-md  text-gray-600 space-y-2 bg-white px-10 my-5 rounded-md py-6">
              <div className="flex justify-center items-center "></div>

              {error ? (
                <Alert status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              ) : null}
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="font-medium">Username</label>

                  <input
                    type="text"
                    required
                    name="username"
                    id="username"
                    onChange={handleChange}
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-medium">Email</label>
                  <input
                    type="email"
                    required
                    name="email"
                    onChange={handleChange}
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
                  className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-900 active:bg-indigo-700 rounded-lg duration-150 disabled:bg-indigo-300 uppercase"
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
          </div>
        </div>
        <div
          className="absolute inset-0 blur-[118px] max-w-lg h-screen mx-auto sm:max-w-3xl sm:h-[400px]"
          style={{
            background:
              "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
          }}
        ></div>
      </main>
    </>
  );
};

export default SignUp;
