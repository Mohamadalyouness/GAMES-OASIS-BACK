// controllers/NewsController.js
import News from "../Models/NewsModel.js";

export const createNews = async (req, res) => {
  try {
    // Check if user is admin
    if (req.userRole !== "admin") {
      return res.status(403).json({ error: "Only admins can create news" });
    }

    const { gameName, content } = req.body;
    const images = req.file.path;
    const newsItem = await News.create({ gameName,images,content });
   
    res.status(201).json(newsItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllNews = async (req, res) => {
  try {
    const newsItems = await News.find();
    res.json(newsItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNewsById = async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) {
      return res.status(404).json({ error: "News not found" });
    }
    res.json(newsItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateNews = async (req, res) => {
  try {
    // Check if user is admin
    if (req.userRole !== "admin") {
      return res.status(403).json({ error: "Only admins can update news" });
    }

    const newsItem = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!newsItem) {
      return res.status(404).json({ error: "News not found" });
    }
    res.json({ message: "News updated", newsItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteNews = async (req, res) => {
  try {
    // Get the user role from the headers
    const userRole = req.headers.role;

    // Check if user is admin
    if (userRole !== "admin") {
      return res.status(403).json({ error: "Only admins can delete news" });
    }

    const newsItem = await News.findByIdAndDelete(req.params.id);
    if (!newsItem) {
      return res.status(404).json({ error: "News not found" });
    }
    res.json({ message: "News deleted", newsItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

