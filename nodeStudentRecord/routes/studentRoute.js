const express= require('express');
const router = express.Router();
const student=require("../models/studentModel");

router.get('/', async (req, res) => {
    try {
        const students = await student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const newStudent = new student(req.body);
    try {
        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const studentData = await student.findById(req.params.id);
        if (!studentData) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(studentData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;