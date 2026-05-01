const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Tasks fetch nahi ho paye" });
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = new Task({
            title,
            description,
            user: req.user.id
        });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(500).json({ message: "Task creation failed" });
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { $set: req.body },
            { new: true }
        );
        if (!task) return res.status(404).json({ message: "Task nahi mila" });
        res.json(task);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ 
            _id: req.params.id, 
            user: req.user.id 
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found or unauthorized" });
        }
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;