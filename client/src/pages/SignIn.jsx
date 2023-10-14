import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [formData, setFormData] = React.useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        // Handle successful signup
        dispatch(signInSuccess(data));
        // console.log(data);
        navigate("/");
      } else {
        // Handle signup error
        dispatch(signInFailure(data.message));
        // console.log(data.message);
        // setError(data.message);
      }
    } catch (error) {
      // Handle network error

      // setError(error.message);
      // console.log(error);
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <>
      <main className="w-full h-screen flex flex-col items-center justify-center px-4 bg-slate-50 overflow-hidden">
        <div className="max-w-sm w-full text-gray-600 space-y-2 bg-white px-10 my-5 rounded-md">
          <div className="text-center pb-8">
            <div className="mt-5">
              <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                Log in to your account
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
            {/* <div>
              <label className="font-medium">Confirm Password</label>
              <input
                onChange={handleChange}
                type="password"
                name="cpassword"
                id="cpassword"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div> */}

            <button
              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 disabled:bg-indigo-300"
              disabled={loading}
            >
              {loading ? "loading..." : "  Sign In"}
            </button>
          </form>
          <OAuth />
          <p className="text-center">
            Dont have an account?
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default SignIn;
