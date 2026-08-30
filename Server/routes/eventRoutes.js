const express = require('express');
const router = express.Router();
const { getEvents, addEvent, deleteEvent, updateEvent } = require('../controllers/eventController');
const upload = require('../middleware/upload');

router.route('/')
    .get(getEvents)
    .post(upload.single('image'), addEvent);

router.route('/:id')
    .put(upload.single('image'), updateEvent)
    .delete(deleteEvent);

module.exports = router;
