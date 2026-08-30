const News = require('../models/News');
const cloudinary = require('../config/cloudinary');

const getNews = async (req, res) => {
    try {
        const news = await News.find().sort({ date: -1 });
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const addNews = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        
        let imageUrl, cloudinaryId;
        if (req.file) {
            imageUrl = req.file.path;
            cloudinaryId = req.file.filename;
        }

        const news = await News.create({ title, description, date, imageUrl, cloudinaryId });
        res.status(201).json(news);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const updateNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ message: 'News not found' });

        const { title, description, date } = req.body;

        // if new image uploaded, delete old one from cloudinary
        if (req.file) {
            if (news.cloudinaryId) await cloudinary.uploader.destroy(news.cloudinaryId);
            news.imageUrl = req.file.path;
            news.cloudinaryId = req.file.filename;
        }

        news.title = title || news.title;
        news.description = description || news.description;
        news.date = date || news.date;

        const updated = await news.save();
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const deleteNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ message: 'News not found' });

        if (news.cloudinaryId) await cloudinary.uploader.destroy(news.cloudinaryId);
        await news.deleteOne();

        res.json({ message: 'News removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getNews, addNews, updateNews, deleteNews };