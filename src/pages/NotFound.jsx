import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-5 ">
        <p className="text-5xl font-extrabold text-gray-200 text-center">404 not found</p>
        <p className="text-4xl font-extrabold">You have found a secret place</p>
        <p className="">
          Unfortunately, this is only a 404 page. You may have mistyped the
          address, or the page has been moved to another URL.
        </p>
        <Link
          className="btn  border-none bg-white text-cyan-600 p-4 transform hover:bg-green-300 hover:text-white"
          to={"/"}
        >take me back to home page</Link>
      </div>
    </div>
  );
}
