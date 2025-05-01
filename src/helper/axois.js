import axios from "axios";

export const axiosUrl = async (endpoint, method, contentType = false, body = undefined) => {
  try {
    contentType = contentType ? "multipart/form-data" : "application/json";
    console.log(contentType, "sadsad");

    const res = await axios({
      url: `http://localhost:3000/${endpoint}`,
      method: method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": contentType,
      },
      data: body
    });

    return res;
  } catch (error) {
    // If you want to log or pass the actual error message
    console.log("Request failed:", error);
    throw new Error(error.response?.data?.message || error.message || "Unknown error");
  }
};