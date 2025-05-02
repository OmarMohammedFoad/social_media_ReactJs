import { useAuth } from "../context/authContext";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
} from "lucide-react";
import { Link } from "react-router";
import { useContext, useEffect, useState } from "react";
import { handleLike } from "../helper/sharedFunctions";

export default ({
  post,
  setLike,
  // liked,
  // totalLikes,
  comment = "",
  setComment = "",
  handleComment = "",
  deletePost,
  isProfile = false,
}) => {
  const [open, setOpen] = useState(false);
  const [toggleComment, setToggleComment] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const date = new Date();

  const [liked, setLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(post.likes.length);
  const { currentUser } = useAuth();

  useEffect(() => {
    setLiked(post.likes.includes(currentUser.id));
  }, [post.likes, currentUser._id]);

  const toggleLike = async () => {
    // console.log(currentUser._id);
    
    const result = await handleLike(post._id, currentUser.id);
    if (result) {
      setLiked(result.liked);
      setTotalLikes(result.totalLikes);
    }
  };

  return (
    <div className="bg-white p-3 mx-3  rounded-2xl shadow-2xl w-svw md:w-2xl  flex flex-col gap-3">
      {/* avatar with usernma and time */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="rounded-full ring ring-cyan-300 w-12 h-12 ">
              <img src={post.author.profileImage} alt="" className="" />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="font-extrabold">{post.author.username}</h1>
            <span className="font-light text-sm">
              {date.toUTCString(post.createdAt)}
            </span>
          </div>
        </div>
        {isProfile && (
          <div>
            <button
              popoverTarget="popover-2"
              style={{ anchorName: "--anchor-1" }}
              onClick={() => setOpen(!open)}
            >
              <MoreHorizontal className="text-gray-500 cursor-pointer hover:text-gray-800" />
            </button>
            {open && (
              <ul
                className="dropdown menu w-52 rounded-box  bg-base-100 shadow-sm"
                // popover="auto"
                id="popover-1"
                style={{ positionAnchor: "--anchor-1" }}
              >
                <li>
                  <a
                    onClick={() => deletePost(post._id)}
                    className="text-red-400"
                  >
                    Delete Post
                  </a>
                </li>
                <li>
                  <a className="text-green-400">Edit Post</a>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* img  */}

      <div className="w-full h-full rounded-lg overflow-hidden">
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt="post"
            className="object-cover w-full h-full rounded-lg"
          />
        ) : (
          <img
            src="/src/assets/egypt.jpg"
            alt="post"
            className="object-cover w-full h-full rounded-lg"
          />
        )}
      </div>

      <div className="flex justify-between text-gray-500 text-2xl ">
        <div className="flex gap-4 ">
          <Heart
            onClick={toggleLike}
            className="cursor-pointer hover:text-red-500"
            fill={liked ? "red" : "white"}
          />
          <MessageCircle
            onClick={() => setToggleComment(!toggleComment)}
            className="cursor-pointer hover:text-blue-500"
          />
          <Share2 className="cursor-pointer hover:text-green-500" />
        </div>
        <div className="flex gap-2">
          <Bookmark className="ml-auto cursor-pointer hover:text-yellow-500" />
          <MoreHorizontal className="cursor-pointer" />
        </div>
      </div>

      <div>
        <h1 className="font-bold">
          {totalLikes} <span>Likes</span>
        </h1>
      </div>
      <div>
        <p className="text-sm">
          <span className="font-bold">{post.author.username}</span>{" "}
          {seeMore
            ? post.content
            : post.content.length > 100
            ? post.content.slice(0, 100) + "..."
            : post.content}
          {post.content.length > 100 && (
            <span
              onClick={() => setSeeMore(!seeMore)}
              className="text-cyan-500 cursor-pointer ml-1"
            >
              {seeMore ? "see less" : "see more"}
            </span>
          )}
        </p>
      </div>
      {/* //!comment section */}

      <div className="text-sm text-gray-500 cursor-pointer">
        <button onClick={() => setToggleComment(!toggleComment)}>
          {post.comments.length == 0
            ? " "
            : `view all comments ${post.comments.length}`}{" "}
        </button>
        {(toggleComment ? post.comments : post.comments.slice(2)).map(
          (comment) => (
            <div key={comment._id} className="flex items-center gap-2 mt-2">
              <div className="avatar">
                <div className="w-12 h-12 rounded-full">
                  <img src={comment.commenter.profileImage} alt="" />
                </div>
              </div>
              <span className="font-bold">{comment.commenter.username}</span>
              <span>{comment.comment}</span>
            </div>
          )
        )}
      </div>

      {toggleComment && (
        <div className="border-t pt-2">
          <input
            onChange={(e) => {
              setComment(e.target.value);
            }}
            type="text"
            value={comment}
            placeholder="Add a comment..."
            className="w-full text-sm p-2 outline-none"
            onKeyDown={(e) => {
              e.key === "Enter" && handleComment(post._id);
            }}
          />
        </div>
      )}
    </div>
  );
};
