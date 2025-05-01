import { Outlet } from "react-router";
import Navbar from "./NavBar";
import RightSide from "./RighSide";
import LeftSide from "./LeftSide";

export default function Layout(params) {
  return (
    <>
      <div className="">
        <Navbar />
        <div className="md:flex h-screen">
          <LeftSide />
          <Outlet />
          <RightSide />
        </div>
      </div>
    </>
  );
}
