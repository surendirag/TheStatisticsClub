const express = require('express');
const router = express.Router();
const { getEvents, addEvent, deleteEvent } = require('../controllers/eventController');
const upload = require('../middleware/upload');

router.route('/')
    .get(getEvents)
    .post(upload.single('image'), addEvent);

router.route('/:id')
    .delete(deleteEvent);

module.exports = router;
