const Member = require('../models/Member');
const cloudinary = require('../config/cloudinary');

const getMembers = async (req, res) => {
    try {
        const members = await Member.find();
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const addMember = async (req, res) => {
    try {
        const { name, rollNo, domain } = req.body;
        
        let imageUrl, cloudinaryId;
        if (req.file) {
            imageUrl = req.file.path;
            cloudinaryId = req.file.filename;
        }

        const member = await Member.create({
            name,
            rollNo,
            domain,
            imageUrl,
            cloudinaryId
        });

        res.status(201).json(member);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const deleteMember = async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);

        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }

        if (member.cloudinaryId) {
            await cloudinary.uploader.destroy(member.cloudinaryId);
        }
        await member.deleteOne();

        res.json({ message: 'Member removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getMembers,
    addMember,
    deleteMember
};
