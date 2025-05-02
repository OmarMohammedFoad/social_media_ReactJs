import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { AuthProvider, useAuth } from "../context/authContext";
import {axiosUrl} from "../helper/axois";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
};
export default function Login() {
  // const [] = useState();
  let navigate = useNavigate();
  const {  loginAuth } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const url = "http://localhost:3000/auth/login";

  const login = async (email, password) => {
    try {
     const res = await axiosUrl("auth/register", "post", false, {
        email,
        password
      });
      // console.log(res.data);

      return res.data;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("Error: " + error.message);
      }
    }

    // if (res.status === 200) {
    //   localStorage.setItem("token", res.data.token);
    //   return res.data;
    // } else {
    //   throw new Error("Login failed");
    // }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      setError("");
      const res = await login(values.email, values.password);
      console.log(res);

      if (res) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        loginAuth(res.user, res.token);
        navigate("/");
      }

      setIsLoading(false);
    },
  });

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     navigate("/home");
  //   }
  // }, []);
  return (
    <div className="bg-gray-200 h-screen flex justify-center items-center">
      <div className="flex flex-col w-ful px-4  md:min-h-[600px] bg-white rounded-xl  lg:flex-row xl:w-[60%] 2xl:w-[80%]">
        <div
          style={{
            background: `
              linear-gradient(rgba(39,11,20,0.5),rgba(39,11,20,0.5)),
              url('https://images.pexels.com/photos/31225680/pexels-photo-31225680/free-photo-of-outdoor-basketball-hoop-under-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
                
              `,
          }}
          className="p-3 flex-1/2 flex flex-col gap-4 text-white bg-contain  rounded-t-xl bg-center lg:justify-around lg:rounded-l-xl lg:rounded-r-none"
        >
          <h1 className="text-8xl font-bold">Hello There!!</h1>
          <p className="">
            Welcome back to our platform! We're excited to see you again.
            Continue your journey with us and explore more opportunities.
          </p>
          <span className="font-bold">Don't have an account?</span>
          <Link
            to="/register"
            className="text-center btn bg-purple-600 p-3 w-[50%] text-white font-extrabold rounded-2xl cursor-pointer transition-all hover:bg-white hover:text-gray-800"
          >
            Register
          </Link>
        </div>
        <div className="p-6 lg:p-10 w-full lg:w-1/2 flex flex-col justify-around">
          <h1 className="text-5xl font-bold mb-6">Login Now</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="border p-3 rounded-md text-gray-900 border-gray-400 placeholder:text-gray-500"
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="on"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="border p-3 rounded-md text-gray-900 border-gray-400 placeholder:text-gray-500"
            />
            {formik.errors.password && formik.touched.password && (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            )}

            <button
              type="submit"
              className="btn bg-purple-600 p-3 w-[50%] text-white font-extrabold rounded-2xl cursor-pointer transition-all hover:bg-black"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
