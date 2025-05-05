import Post from "../components/Post";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { axiosUrl } from "../helper/axois";
import { ImageIcon } from "lucide-react";
import {
  addPostHandler,
  createPost,
  handleComment,
} from "../helper/sharedFunctions";
import toast, { Toaster } from "react-hot-toast";
import { SharePost } from "../components/Shared";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState({});
  const [profilePicture, setProfilePicture] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [comment, setComment] = useState("");

  const [edit, isEditing] = useState(false);
  const { currentUser } = useAuth();
  const updatePost = async (postId, formData) => {
    try {
      // console.log(postId, "postId", newContent);

      await axiosUrl(`posts/${postId}`, "put", true, formData);
      toast.success("the post updated !!");
      fetchPosts();
    } catch (err) {
      console.error("Failed to update post", err);
    }
  };
  const fetchPosts = async () => {
    try {
      const res = await axiosUrl("posts/user-posts/", "get");

      setPosts(res.data);
    } catch (error) {
      console.log(error);
      // Add toast for error
      toast.error("Failed to fetch posts");
    }
  };

  const handleToggleImage = () => {
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.click();
      setProfilePicture(fileInput.files[0]);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const { data } = await axiosUrl("auth/profile-info", "get", false);

      setProfile(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch user information");
    }
  };

  const updateUserInfo = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("username", profile.username);
      formData.append("jobTitle", profile.jobTitle);
      formData.append("bio", profile.bio);
      formData.append("image", profilePicture);
      const res = await axiosUrl("auth/update-profile", "put", true, formData);
      setProfile(res.data);
      toast.success("Profile updated successfully!");
      fetchUserInfo();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  };

  const deletePost = async (postId) => {
    try {
      await axiosUrl(`posts/${postId}`, "delete");
      toast.success("Post deleted successfully");
      fetchPosts();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete post");
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchUserInfo();
    // updateUserInfo()
  }, []);

  return (
    <div className="w-full bg-gray-300 flex flex-col   xs:justify-center  overflow-y-auto items-center gap-2.5 sticky top-0 md:w-1/2  ">
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        toastOptions={{
          className: "",
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />{" "}
      <div className="flex flex-col justify-center p-3 items-center bg-white w-[80%] mt-20 relative rounded-2xl shadow-xl">
        <div className="avatar -top-12">
          <div className="rounded-full w-[150px] ring ring-cyan-300">
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt="avatar"
                className="object-cover w-full h-full rounded-full"
              />
            ) : (
              <img
                src="/src/assets/egypt.jpg"
                alt="avatar"
                className="object-cover w-full h-full rounded-full"
              />
            )}
          </div>
        </div>

        {edit ? (
          <form className="flex flex-col items-center gap-2 mt-10">
            <input
              type="text"
              className="input input-bordered w-full max-w-xs "
              placeholder="Username"
              value={profile.username || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  username: e.target.value,
                })
              }
            />
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              placeholder="Job Title"
              value={profile.jobTitle || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  jobTitle: e.target.value,
                })
              }
            />
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Bio"
              value={profile.bio || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  bio: e.target.value,
                })
              }
            ></textarea>
            <ImageIcon
              onClick={handleToggleImage}
              className="text-gray-500 cursor-pointer hover:text-cyan-500"
            />
            <input
              type="file"
              className="hidden"
              onChange={(e) =>
                setProfile({
                  ...profile,
                  profileImage: e.target.files[0],
                })
              }
              accept="image/*"
            />
            <button
              className="btn btn-primary"
              onClick={(e) => updateUserInfo(e)}
            >
              Save
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-2">
              <h2 className="text-2xl font-semibold text-gray-500">{profile.username}</h2>
            <p className="text-gray-500">{profile.jobTitle}</p>
            <p className="text-gray-500">{profile.bio}</p>
          </div>
        )}
        <button
          className="mt-4 btn btn-primary"
          onClick={() => {
            isEditing(!edit);
          }}
        >
          {edit ? "Cancel" : "Edit"}
        </button>
      </div>
      <SharePost
        addPost={() =>
          addPostHandler({ content, image, setContent, setImage, fetchPosts })
        }
        currentUser={currentUser}
        post={content}
        setContent={setContent}
        handleToggleImage={handleToggleImage}
        setImage={setImage}
        image={image}
      />
      {posts.map((post) => (
        <Post
          isProfile={true}
          comment={comment}
          image={post.imageUrl}
          post={post}
          setComment={setComment}
          handleComment={(postId) =>
            handleComment(postId, comment, setComment, fetchPosts)
          }
          deletePost={deletePost}
          key={post._id}
          updatePost={(postId, content) => updatePost(postId, content)}
        />
      ))}
    </div>
  );
}
