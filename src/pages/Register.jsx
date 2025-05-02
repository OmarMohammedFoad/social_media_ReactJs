import { Link } from "react-router";
import { useFormik } from "formik";
// import { signUp } from "../services/authService";
import { axiosUrl } from "../helper/axois";

import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "User name is required";
  } else if (values.username.length > 15) {
    errors.username = "Must be 15 characters or less";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
      values.password
    )
  ) {
    errors.password =
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export default function Register() {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  // const url = "http://localhost:3000/auth/register";

  const signUp = async (username, email, password) => {
    try {
     const res = await axiosUrl("auth/register", "post", false, {
        username,
        email,
        password,
      });

      console.log(res);
      return res.data;
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        setError(error.response.data.message);
      } else if (error.request) {
        console.log(error.request);
        setError("No response from server");
      } else {
        console.log("Error", error.message);
        setError("An error occurred");
      }
    }

    //   if (res.status === 200) {
    //     return res.data;
    //   }
    // } catch (error) {
    //   return error.response.data.message;
    // }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: async (values) => {
      setError("");
      const res = await signUp(values.username, values.email, values.password);
      if (res) {
        navigate("/login");
      }
    },
  });

  return (
    <div className="bg-gray-200 h-screen flex justify-center items-center">
      <div className="flex flex-col w-ful px-4  md:min-h-[600px] bg-white rounded-xl  lg:flex-row xl:w-[60%] 2xl:w-[80%]">
        <div
          className="p-3 w-full lg:w-1/2 flex flex-col gap-4 text-white rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none lg:justify-around"
          style={{
            backgroundImage: `
              linear-gradient(rgba(39,11,20,0.5),rgba(39,11,20,0.5)),
              url('https://images.pexels.com/photos/7103117/pexels-photo-7103117.jpeg')`,
            backgroundSize: "cover",
          }}
        >
          <h1 className="text-5xl font-bold">Hello There!!</h1>
          <p>
            Welcome to our platform! We are excited to have you here. Join us
            and explore a world of opportunities. Our community is waiting for
            you to connect, learn, and grow. Whether you're looking for
            information, support, or just a friendly chat, you've come to the
            right place. Don't hesitate to reach out and start your journey with
            us today. We can't wait to see what you'll achieve!
          </p>
          <span className="font-bold">Have an account?</span>
          <Link
            to="/login"
            className="text-center btn bg-purple-600 p-3 w-[50%] text-white font-extrabold rounded-2xl cursor-pointer transition-all hover:bg-white hover:text-gray-800"
          >
            Login
          </Link>
        </div>

        <div className="p-6 lg:p-10 w-full lg:w-1/2 flex flex-col justify-around">
          <h1 className="text-5xl font-bold mb-6 text-gray-800">Register Now!!</h1>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
            <input
              type="text"
              name="username"
              placeholder="User name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className="border p-3 rounded-md text-gray-900 border-gray-400 placeholder:text-gray-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="border p-3 rounded-md text-gray-900 border-gray-400 placeholder:text-gray-500"
            />

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

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              autoComplete="on"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className="border p-3 rounded-md text-gray-900 border-gray-400 placeholder:text-gray-500"
            />

            {(formik.errors.userName ||
              formik.errors.email ||
              formik.errors.password ||
              formik.errors.confirmPassword) && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-2">
                {formik.errors.userName && <div>{formik.errors.userName}</div>}
                {formik.errors.email && <div>{formik.errors.email}</div>}
                {formik.errors.password && <div>{formik.errors.password}</div>}
                {formik.errors.confirmPassword && (
                  <div>{formik.errors.confirmPassword}</div>
                )}
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-2">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="btn bg-purple-600 p-3 w-[50%] text-white font-extrabold rounded-2xl cursor-pointer transition-all hover:bg-black"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
