import { useEffect, useState } from "react";

import Post from "../components/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAuth } from "../context/authContext";
import { axiosUrl } from "../helper/axois";
import { SharePost } from "../components/Shared";
import { Toaster } from "react-hot-toast";
import {
  addPostHandler,
  handleComment,
  handleLike,
} from "../helper/sharedFunctions";

const Home = () => {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [like, setLike] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const [image, setImage] = useState();
  const [comment, setComment] = useState();
  const { currentUser, token } = useAuth();
  const limit = 3;

  const fetchPosts = async () => {
    try {
      const skip = (page - 1) * limit;
      const { data } = await axiosUrl(`posts?skip=${skip}&limit=${limit}`);
      if (data.length < limit) setHasMore(false);
      setPosts((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
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
    <div className="w-full md:w-1/2 h-screen flex flex-col items-center bg-gray-300">
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

      {/* Sticky SharePost at the top */}
      <div className="w-full flex items-center justify-center sticky top-0 z-10 bg-gray-300">
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
      </div>

      {/* Scrollable Post Area */}
      <div
        id="scrollableDiv"
        className="w-full flex-1  overflow-y-auto flex flex-col items-center gap-2.5 px-2"
      >
        <InfiniteScroll
          dataLength={posts.length}
          className="mb-2"
          next={fetchPosts}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p className="text-center text-sm">No more posts</p>}
          scrollableTarget="scrollableDiv"
        >
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
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Home;
