const express = require("express")
const blogRouter = express.Router();
const { getAllBlogs , addBlog ,
     updateBlog ,getById , 
    deleteBlog , getByUserId} = require("../controller/blog-controller");

blogRouter.get("/",getAllBlogs);
blogRouter.post('/add', addBlog);
blogRouter.put("/update/:id",  updateBlog);
blogRouter.get("/user/:id",getByUserId);
blogRouter.get("/:id", getById);
blogRouter.delete("/:id",deleteBlog);
module.exports = blogRouter;