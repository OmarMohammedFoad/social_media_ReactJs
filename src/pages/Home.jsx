import { useEffect, useId, useState } from "react";

import Post from "../components/Post";

import { useAuth } from "../context/authContext";
import { axiosUrl } from "../helper/axois";
import { SharePost } from "../components/Shared";
import { Toaster } from "react-hot-toast";
import {
  addPostHandler,
  createPost,
  handleComment,
  handleLike,
} from "../helper/sharedFunctions";

const Home = () => {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [like, setLike] = useState(false);
  const [image, setImage] = useState();
  const [comment, setComment] = useState();
  const { currentUser, token } = useAuth();
  const fetchPosts = async () => {
    try {
      const { data } = await axiosUrl(`posts`);
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleLikePost = async (postId, userId) => {
    const { data } = await handleLike(postId, userId);
    await fetchPosts();
    setLike(data);
  };
  const handleToggleImage = () => {
    const fileInput = document.querySelector('input[type="file"]');
    fileInput.click();

    setImage(fileInput.files[0]);
  };

  useEffect(() => {
    if (token) {
      fetchPosts();
    }
  }, [token]);

  return (
    <div className="w-full  md:w-1/2 bg-gray-300 flex flex-col  overflow-y-auto items-center gap-2.5 sticky top-0">
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
      />
      <SharePost
        addPost={() =>
          addPostHandler({ content, image, setContent, setImage, fetchPosts })
        }
        currentUser={currentUser}
        content={content}
        setContent={setContent}
        image={image}
        handleToggleImage={handleToggleImage}
        setImage={setImage}
      />
      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          setLike={(postId, userId) => handleLikePost(postId, userId)}
          liked={post?.liked}
          totalLikes={post.likes.length}
          comment={comment}
          setComment={setComment}
          handleComment={(postId) =>
            handleComment(postId, comment, setComment, fetchPosts)
          }
          image={image}
        />
        // <>
        //   <Post key={i} />
        // </>
      ))}
    </div>
  );
};

export default Home;
