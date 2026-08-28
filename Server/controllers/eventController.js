const Event = require('../models/Event');
const cloudinary = require('../config/cloudinary');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Add a new event
// @route   POST /api/events
// @access  Private
const addEvent = async (req, res) => {
    try {
        const { title, description, date, venue } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ message: 'Image is required' });
        }

        const event = await Event.create({
            title,
            description,
            date,
            venue,
            imageUrl: req.file.path,
            cloudinaryId: req.file.filename
        });

        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Delete image from cloudinary
        await cloudinary.uploader.destroy(event.cloudinaryId);

        // Delete from DB
        await event.deleteOne();

        res.json({ message: 'Event removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getEvents,
    addEvent,
    deleteEvent
};
