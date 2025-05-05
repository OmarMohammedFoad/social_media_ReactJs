import React from "react";
import { X, UserPlus } from "lucide-react";

// Mock data to avoid repetition
const suggestions = [
  { id: 1, name: "Omar Fouad", imageUrl: "src/assets/egypt.jpg" },
  { id: 2, name: "Sarah Gaber", imageUrl: "src/assets/egypt.jpg" },
  { id: 5, name: "Karim Salah", imageUrl: "src/assets/egypt.jpg" },
  { id: 6, name: "Nour Ibrahim", imageUrl: "src/assets/egypt.jpg" },
];

const SuggestionCard = ({ user }) => (
  <div className="flex  justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
    <div className="flex gap-3 items-center">
      <div className="avatar">
        <div className="rounded-full w-12 h-12 ring-2  ring-blue-100">
          <img className="object-cover" src={user.imageUrl} alt="" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className=" text-gray-800 text-lg">{user.name}</span>
        <span className="text-xs text-gray-500">Suggested for you</span>
      </div>
    </div>
    <div className="flex gap-2">
      <button className="flex items-center gap-2   btn btn-sm btn-primary ">
        <UserPlus size={14} />
        <span className="">Follow</span>
      </button>
      <button className="btn btn-sm btn-ghost text-gray-500 hover:bg-gray-50 ">
        <X size={16} />
      </button>
    </div>
  </div>
);

const SuggestionSection = ({ title, users }) => (
  <div className="bg-white dark:bg-gray-700 shadow-sm w-full rounded-2xl p-4">    <div className="flex justify-between items-center mb-3 mx-2 ">
      <h3 className="font-semibold text-gray-500">{title}</h3>
      <button className="text-blue-500 text-sm hover:text-blue-700 font-medium">
        See All
      </button>
    </div>
    <div className="space-y-2">
      {users.map((user) => (
        <SuggestionCard user={user} key={user.id} />
      ))}
    </div>
  </div>
);

const SponsoredContent = () => (
  <div className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-sm w-full">    <div className="flex justify-between items-center mb-3">
      <h3 className="font-semibold text-gray-500">Sponsored</h3>
    </div>
    <div className="space-y-4">
      <div className="rounded-lg overflow-hidden">
        <img
          src="src/assets/pyramid.jpg"
          alt="Advertisement"
          className="w-full h-70 object-cover"
        />
        <div className="p-2">
          <h4 className="font-medium">Discover Amazing Products</h4>
          <p className="text-xs text-gray-500">www.Egypt.com</p>
        </div>
      </div>
    </div>
  </div>
);


const OnlineFriends = () => (
  <div className="bg-white dark:bg-gray-700 shadow-sm p-4 w-full rounded-xl">    <div className=" items-center mb-3">
      <h3 className="font-semibold text-gray-500">Online Friends</h3>
    </div>
    <div className="flex items-center gap-3 hover:bg-gray-50 rounded-xl p-2 cursor-pointer">
      <div className="avatar relative">
        <div className="rounded-full  w-10 h-10 overflow-hidden">
          <img src="src/assets/pyramid.jpg" alt="" />
        </div>
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
      </div>
      <span className="font-medium text-gray-700">Omar Fouad</span>
    </div>
  </div>
);

export default function RightSide() {
  // Split suggestions into two groups for different sections
  const friendSuggestions = suggestions.slice(0, 3);
  const pageSuggestions = suggestions.slice(3, 5);

  return (
<aside className="hidden md:flex   flex-1/4 h-screen sticky bg-gray-50 dark:bg-gray-800 overflow-y-auto pb-20 pt-4 px-4">      <div className="flex flex-col gap-6">
        <SponsoredContent />
        <SuggestionSection
          title="People You May Know"
          users={friendSuggestions}
        />
        <SuggestionSection title="Suggested Pages" users={pageSuggestions} />
        {/* <AnotherOnline /> */}
        <OnlineFriends />

        <div className="text-xs text-gray-400 dark:text-gray-300 px-2">
          <p>
            Privacy · Terms · Advertising · Ad Choices · Cookies · More · Meta ©
            2025
          </p>
        </div>
      </div>
    </aside>
  );
}
