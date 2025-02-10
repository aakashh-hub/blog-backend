const Blog = require('../models/Blog');

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBlog = async (req, res) => {
  const { author, title, description, blogContent, imageUrl, date } = req.body;
  try {
    const newBlog = await Blog.create({ author, title, description, blogContent, imageUrl, date });
    res.status(201).json(newBlog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: error.message });
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { author, title, description, blogContent, imageUrl } = req.body;

  try {
    const blog = await Blog.findByPk(id);
    if (blog) {
      blog.author = author || blog.author;
      blog.title = title || blog.title;
      blog.description = description || blog.description;
      blog.blogContent = blogContent || blog.blogContent;
      blog.imageUrl = imageUrl || blog.imageUrl;

      await blog.save();
      res.status(200).json(blog);
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findByPk(id);
    if (blog) {
      await blog.destroy();
      res.status(200).json({ message: "Blog deleted" });
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};
