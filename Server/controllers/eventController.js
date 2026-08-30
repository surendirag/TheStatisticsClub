const Event = require('../models/Event');
const cloudinary = require('../config/cloudinary');

const getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const addEvent = async (req, res) => {
    try {
        const { title, description, date, status, location } = req.body;
        
        if (!req.file) return res.status(400).json({ message: 'Image is required' });

        const event = await Event.create({
            title, description, date, status, location,
            imageUrl: req.file.path,
            cloudinaryId: req.file.filename
        });

        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        const { title, description, date, status, location } = req.body;

        // if new image uploaded, delete old one from cloudinary
        if (req.file) {
            if (event.cloudinaryId) await cloudinary.uploader.destroy(event.cloudinaryId);
            event.imageUrl = req.file.path;
            event.cloudinaryId = req.file.filename;
        }

        event.title = title || event.title;
        event.description = description || event.description;
        event.date = date || event.date;
        event.status = status || event.status;
        event.location = location || event.location;

        const updated = await event.save();
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        await cloudinary.uploader.destroy(event.cloudinaryId);
        await event.deleteOne();

        res.json({ message: 'Event removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getEvents, addEvent, updateEvent, deleteEvent };