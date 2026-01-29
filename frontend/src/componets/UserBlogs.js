/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { Box, Typography, CircularProgress, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import config from "../config";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "80vh",
    paddingTop: "40px",
    paddingBottom: "40px",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
    fontWeight: "bold !important",
    color: "#333",
  },
  blogsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    maxWidth: "900px",
    margin: "0 auto",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "60vh",
    flexDirection: "column",
    gap: "20px",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "12px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  emptyStateTitle: {
    fontSize: "24px !important",
    fontWeight: "600 !important",
    marginBottom: "12px !important",
    color: "#555",
  },
  emptyStateText: {
    fontSize: "16px !important",
    color: "#777",
  },
  blogCount: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "18px !important",
    color: "#666",
  },
}));

const UserBlogs = () => {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const id = localStorage.getItem("userId");

  const sendRequest = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/api/blogs/user/${id}`);
      return res.data;
    } catch (err) {
      console.log("Error fetching user blogs:", err);
      return null;
    }
  };

  useEffect(() => {
    if (id) {
      sendRequest().then((data) => {
        setUser(data?.data?.user);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <Box className={classes.loadingContainer}>
        <CircularProgress size={60} />
        <Typography variant="h6">Loading your blogs...</Typography>
      </Box>
    );
  }

  if (!id) {
    return (
      <Container className={classes.container}>
        <Box className={classes.emptyState}>
          <Typography className={classes.emptyStateTitle}>
            🔐 Authentication Required
          </Typography>
          <Typography className={classes.emptyStateText}>
            Please login to view your blogs
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!user || !user.blogs || user.blogs.length === 0) {
    return (
      <Container className={classes.container}>
        <Box className={classes.emptyState}>
          <Typography className={classes.emptyStateTitle}>
            📝 No Blogs Yet
          </Typography>
          <Typography className={classes.emptyStateText}>
            You haven't created any blogs yet. Start sharing your thoughts!
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container className={classes.container}>
      <Typography variant="h3" className={classes.header}>
        My Blogs
      </Typography>
      <Typography className={classes.blogCount}>
        {user.blogs.length} {user.blogs.length === 1 ? "blog" : "blogs"} published
      </Typography>
      <Box className={classes.blogsWrapper}>
        {user.blogs.map((blog) => (
          <Blog
            key={blog._id}
            id={blog._id}
            isUser={true}
            title={blog.title}
            desc={blog.desc}
            img={blog.img}
            user={user.name}
            date={new Date(blog.date).toLocaleDateString()}
          />
        ))}
      </Box>
    </Container>
  );
};

export default UserBlogs;
