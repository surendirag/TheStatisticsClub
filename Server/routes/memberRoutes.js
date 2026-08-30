const express = require('express');
const router = express.Router();
const { getMembers, addMember, deleteMember, updateMember } = require('../controllers/memberController');
const upload = require('../middleware/upload');

router.route('/')
    .get(getMembers)
    .post(upload.single('image'), addMember);

router.route('/:id')
    .put(upload.single('image'), updateMember)
    .delete(deleteMember);

module.exports = router;
