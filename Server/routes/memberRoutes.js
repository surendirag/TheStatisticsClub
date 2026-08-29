const express = require('express');
const router = express.Router();
const { getMembers, addMember, deleteMember } = require('../controllers/memberController');
const upload = require('../middleware/upload');

router.route('/')
    .get(getMembers)
    .post(upload.single('image'), addMember);

router.route('/:id')
    .delete(deleteMember);

module.exports = router;
