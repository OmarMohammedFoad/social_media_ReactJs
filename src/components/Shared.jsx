import { ImageIcon } from "lucide-react";
import { useRef } from "react";

export const SharePost = ({
  currentUser,
  addPost,
  post,
  setContent,
  handleToggleImage,
  setImage,
  image
}) => {
  console.log(image,
    "image"
  );
  // console.log("currentUserrrrrr", currentUser);
  
  return (
    <div className="bg-white w-svw md:w-[80%] rounded-2xl p-4 m-3 shadow-2xl">
      <div className="flex flex-col gap-4">
        {/* Avatar & Name */}
        <div className="flex gap-1.5 items-center">
          <div className="avatar">
            <div className="w-12 h-12 rounded-full ring ring-cyan-100 ">
              <img
                src={currentUser?.imgProfile || "/src/assets/egypt.jpg"}
                alt="avatar"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <h1 className="text-xl font-light text-gray-500">{currentUser?.name}</h1>
        </div>

        {/* Input */}
        <div className="flex-1 border-b pb-2">
          <input
            name="post"
            type="text"
            placeholder="What's on your mind?"
            value={post}
            className="w-full text-black outline-none text-sm placeholder:text-gray-400"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <ImageIcon
              onClick={handleToggleImage}
              className="text-gray-500 cursor-pointer hover:text-cyan-500"
            />
            <input
              // ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <span className="font-light text-sm text-gray-400">Add photo</span>
            {image && (
              <div className="h-28 w-28  rounded-lg overflow-hidden">
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </div>
          <button
            onClick={addPost}
            className="bg-cyan-500 text-white px-4 py-1 rounded-lg hover:bg-cyan-600 transition"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};
