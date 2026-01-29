import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import config from "../config";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/api/blogs`);
      return res.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data?.data?.blogs));
  }, []);
  console.log(blogs);
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            desc={blog.desc}
            img={blog.img}
            user={blog.user.name}
            date={new Date(blog.date).toLocaleDateString()}
          />
        ))}
    </div>
  );
};

export default Blogs;
