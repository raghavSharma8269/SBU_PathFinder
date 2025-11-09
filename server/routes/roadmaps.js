const express = require('express');
const router = express.Router();
const Roadmap = require('../models/Roadmap');

// Save a new roadmap JSON to MongoDB
router.post('/', async (req, res) => {
  try {
    console.log('Create roadmap request body:', JSON.stringify(req.body));
    const { title, roadmap } = req.body;

    if (!title || !roadmap) {
      return res.status(400).json({ error: 'Title and roadmap JSON are required.' });
    }

    const newRoadmap = new Roadmap({ title, roadmap });
    const savedRoadmap = await newRoadmap.save();

    res.status(201).json(savedRoadmap);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save roadmap.' });
  }
});

// GET /api/roadmaps
// List all roadmaps
router.get('/', async (req, res) => {
  try {
    const allRoadmaps = await Roadmap.find();
    res.json(allRoadmaps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch roadmaps.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const roadmapId = req.params.id;

    // Check if ID is a valid MongoDB ObjectId
    if (!roadmapId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid roadmap ID.' });
    }

    const result = await Roadmap.findById(roadmapId);

    if (!result) {
      return res.status(404).json({ error: 'Roadmap not found.' });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch roadmap.' });
  }
});

// POST /api/roadmaps/:id
// Update the `roadmap` field of an existing roadmap document by ID.
router.post('/:id', async (req, res) => {
  try {
    const roadmapId = req.params.id;

    // Basic ObjectId validation
    if (!roadmapId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid roadmap ID.' });
    }

    const { roadmap } = req.body;

  console.log(`Update roadmap ${roadmapId} request body:`, JSON.stringify(req.body));

    if (roadmap === undefined) {
      return res.status(400).json({ error: 'Request body must include a `roadmap` field.' });
    }

    const updated = await Roadmap.findByIdAndUpdate(
      roadmapId,
      { $set: { roadmap } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Roadmap not found.' });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update roadmap.' });
  }
});



module.exports = router;

