import axios from "axios";
import process from 'dotenv'

export const axiosUrl = async (endpoint, method, contentType = false, body = undefined) => {
  let url = "";
  try {


    contentType = contentType ? "multipart/form-data" : "application/json";
    // console.log(contentType, "sadssssssssssssssssssssad");

    console.log(import.meta.env.VITE_API_URL);

    if (import.meta.env.VITE_API_URL === 'development') {
      url = 'http://localhost:3000/'
    }else{

        url= 'https://socialmediaapi-production-412c.up.railway.app/'
    }

    const res = await axios({
      url: `${url}${endpoint}`,
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