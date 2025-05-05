import Friends from "../assets/1.png";
import Groups from "../assets/2.png";
import Market from "../assets/3.png";
import Watch from "../assets/4.png";
import Memories from "../assets/5.png";
import Events from "../assets/6.png";
import Gaming from "../assets/7.png";
import Gallery from "../assets/8.png";
import Videos from "../assets/9.png";
import Messages from "../assets/10.png";
import Tutorials from "../assets/11.png";
import Courses from "../assets/12.png";
import Fund from "../assets/13.png";
import { Link } from "react-router";
import { useAuth } from "../context/authContext";

export default function LeftSide() {
  const { currentUser } = useAuth();
  return (
    <>
      <aside className="md:flex md:flex-1/4  w-0.5 p-3 sticky overflow-y-scroll appearance-none hidden">
        <div className="container">
          <div className="main flex flex-col gap-4 ">
            <div className="flex items-center gap-1.5 hover:bg-gray-200 p-1  hover:rounded-l cursor-pointer  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <Link to={"/profile"}>
                <span>`${currentUser.name}</span>
              </Link>
            </div>
            <div className="flex items-center gap-1.5 hover:bg-gray-200 p-1  hover:rounded-l cursor-pointer  ">
              <img src={Friends} alt="" className="p-1 w-8" />
              <span>Friends</span>
            </div>
            <div className="flex items-center gap-1.5 hover:bg-gray-200 p-1  hover:rounded-l cursor-pointer  ">
              <img src={Groups} alt="" className="p-1 w-8" />
              <span>Groups</span>
            </div>
            <div className="flex items-center gap-1.5 hover:bg-gray-200 p-1  hover:rounded-l cursor-pointer  ">
              <img src={Market} alt="" className="p-1 w-8" />

              <span>Market Place</span>
            </div>
            <div className="flex items-center gap-1.5 hover:bg-gray-200 p-1  hover:rounded-l cursor-pointer  ">
              <img src={Watch} alt="" className="p-1 w-8" />

              <span>Watch </span>
            </div>
          </div>
          <hr className="text-gray-300 my-4" />
          <div className="main flex flex-col gap-4">
            <div className="flex items-center gap-1.5 hover:bg-gray-200 p-1  hover:rounded-l cursor-pointer  ">
              <img src={Events} alt="" className="p-1 w-8" />
              <span>Events</span>
            </div>
            <div className="flex items-center gap-1.5 hover:bg-gray-200 p-1  hover:rounded-l cursor-pointer  ">
              <img src={Gaming} alt="" className="p-1 w-8" />
              <span>Gaming</span>
            </div>
            <div className="flex items-center gap-1.5 hover:bg-gray-200 p-1  hover:rounded-l cursor-pointer  ">
              <img src={Gallery} alt="" className="p-1 w-8" />
              <span>Gallery</span>
            </div>
            <div className="flex items-center gap-1.5 hover:bg-gray-200 p-1  hover:rounded-l cursor-pointer  ">
              <img src={Videos} alt="" className="p-1 w-8" />

              <span>Videos</span>
            </div>
            <div className="flex items-center gap-1.5 hover:bg-gray-200 p-1  hover:rounded-l cursor-pointer  ">
              <img src={Messages} alt="" className="p-1 w-8" />

              <span>Messages</span>
            </div>
          </div>
          <hr className="text-gray-300 my-4" />
          <div className="main flex flex-col gap-4">
            <div className="flex items-center gap-1.5 hover:bg-gray-200 p-1  hover:rounded-l cursor-pointer  ">
              <img src={Fund} alt="" />
              <span>Fundraiser</span>
            </div>

            <div className="flex items-center gap-1.5 hover:bg-gray-200 p-1  hover:rounded-l cursor-pointer  ">
              <img src={Tutorials} alt="" className="p-1 w-8" />
              <span>Tutorials</span>
            </div>

            <div className="flex items-center gap-1.5 hover:bg-gray-200 p-1  hover:rounded-l cursor-pointer  ">
              <img src={Courses} alt="" className="p-1 w-8" />

              <span>Courses </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
