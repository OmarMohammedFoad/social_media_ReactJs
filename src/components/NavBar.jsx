import { House, MessageCircleMore, User, Bell, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import {axiosUrl} from "../helper/axois";

const HiddenEndNavbar = ({ currentUser, token, logOut }) => {
  // console.log(currentUser.imgProfile);

  return (
    <div className="navbar-end flex-col  w-64 md:w-full gap-3  md:flex-row">
      <button className="btn btn-ghost btn-circle">
        <Link to={"/profile"}>
          <User />
        </Link>
      </button>

      <button className="btn btn-ghost btn-circle">
        <Bell className="" />
      </button>
      <div className="">
        <p className="text-xl ">
          Welcome <span>{currentUser.name.split(" ")[0].toUpperCase()}</span>
        </p>
      </div>

      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <Link to={"/profile"}>
          {" "}
          <img alt="profile-img" src={currentUser.imgProfile} />
        </Link>
      </div>

      {token ? (
        <button className="btn btn-error " onClick={logOut}>
          logOut
        </button>
      ) : (
        <button className="btn btn-error " onClick={logOut}>
          signIn
        </button>
      )}
    </div>
  );
};

export default function Navbar() {
  const naviagte = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { logoutAuth, currentUser, token } = useAuth();
  const [imgProfile, setImgProfile] = useState();
  const logOut = () => {
    logoutAuth();
    naviagte("/login");
  };
  // console.log("currentUser", currentUser);

  const fetchUserInfo = async () => {
    try {
      const { data } = await axiosUrl("auth/profile-info", "get", false);
      console.log(data);
      
      setImgProfile(data.profileImage);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch user information");
    }
  };


  useEffect(() => {
    fetchUserInfo();
  }, []);

  //? mobile first approach => yalla bena
  return (
    <div className="navbar sticky flex-col top-0 w-full bg-base-100 dark:bg-gray-800 shadow-sm z-50 px-4 md:flex-row md:px8">
      <div className="navbar-start flex flex-col md:flex-row  gap-4 w-full  items-center md:w-auto ">
        <Link to={"/"} className="btn btn-ghost  text-5xl mt-1 md:text-xl">
          Facelook
        </Link>
        <div className="flex gap-2">
          <Link to={"/"} className="  btn btn-ghost btn-circle">
            <House />
          </Link>
          {/* <ThemeToggle /> */}
        </div>

        <label className="input  w-full md:w-64 flex items-center gap-2">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" required placeholder="Search" />
        </label>
      </div>

      <button
        className="md:hidden text-gray-600 mt-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? "max-h-60 " : "max-h-0"
        }`}
      >
        <HiddenEndNavbar
          currentUser={currentUser}
          token={token}
          logOut={logOut}
        />
      </div>

      <div className="navbar-end   hidden md:flex   w-64 md:w-full gap-3   ">
        <button className="btn btn-ghost btn-circle">{/* <User /> */}</button>

        <button className="btn btn-ghost btn-circle">
          {/* <Bell className="" /> */}
        </button>
        <div className="">
          <p className="text-xl ">
            Welcome <span>{currentUser.name.split(" ")[0].toUpperCase()}</span>
          </p>
        </div>

        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <Link to={"/profile"}>
              {" "}
              <img alt="profile-img" src={imgProfile} />
            </Link>
          </div>
        </div>

        {token ? (
          <button className="btn btn-error " onClick={logOut}>
            logOut
          </button>
        ) : (
          <button className="btn btn-error " onClick={logOut}>
            signIn
          </button>
        )}
      </div>
    </div>
  );
}
