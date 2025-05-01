import { axiosUrl } from "./axois";
import toast from "react-hot-toast";

export const handleLike = async (postId, userId) => {
  console.log(postId, userId);


  try {
    const { data } = await axiosUrl(`posts/${postId}/like-post`, 'PUT', false, { user: userId });
    // console.log(data);
    
    return data;
  } catch (error) {
    console.error("Error like post:", error);
    
  }

};


export const handleComment = async (postId, comment, setComment, fetchPosts) => {
  try {
    const res = await axiosUrl("comments", "post", false, {
      comment: comment,
      post: postId,
    });
    console.log("Comment response:", res);

    // console.log("Comment added:", res.data);
    fetchPosts();
    setComment("");
    toast.success("Comment added successfully!");

  } catch (error) {
    console.error("Error adding comment:", error);
  }
};


export const createPost = async (content, imageUrl) => {

  const formData = new FormData();
  formData.append("content", content);
  formData.append("image", imageUrl);

  // console.log(formData);

  try {
    // const res = await axios.post(`http://localhost:3000/posts`, formData, {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     "Content-Type": "multipart/form-data",
    //   },
    // });

    const res = await axiosUrl("posts/", "post", true, formData);
    // console.log(res.data);

    return res.data;
  } catch (error) {
    console.error("Error creating post:", error);
  }
};



export const addPostHandler = async ({
  content,
  image,
  setContent,
  setImage,
  fetchPosts,
}) => {
  try {
    const postId = await createPost(content, image, setContent, fetchPosts);
    if (postId) {
      setContent("");
      setImage("");
      fetchPosts();
      toast.success("Post created successfully!");
    }
    console.log("Post created with ID:", postId);
  } catch (error) {
    console.error("Error creating post:", error);
  }
};