const express = require("express");
const router = express.Router();
const Roadmap = require("../models/Roadmap");
const axios = require("axios");

// Save a new roadmap JSON to MongoDB
router.post("/", async (req, res) => {
  try {
    const { title, roadmap, formData } = req.body;

    if (!title || !roadmap || !formData) {
      return res
        .status(400)
        .json({ error: "Title and roadmap JSON are required." });
    }

    const newRoadmap = new Roadmap({ title, roadmap, formData });
    const savedRoadmap = await newRoadmap.save();

    res.status(201).json(savedRoadmap);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save roadmap." });
  }
});

// GET /api/roadmaps
// List all roadmaps
router.get("/", async (req, res) => {
  try {
    const allRoadmaps = await Roadmap.find();
    res.json(allRoadmaps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch roadmaps." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const roadmapId = req.params.id;

    // Check if ID is a valid MongoDB ObjectId
    if (!roadmapId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid roadmap ID." });
    }

    const result = await Roadmap.findById(roadmapId);

    if (!result) {
      return res.status(404).json({ error: "Roadmap not found." });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch roadmap." });
  }
});

router.post("/generate", async (req, res) => {
  try {
    const formData = req.body;

    // Build parameters dynamically
    const params = [
      { name: "Target Role", value: formData.targetRole },
      { name: "Current Year", value: formData.currentYear || "" },
      { name: "Target Timeline", value: formData.targetTimeline || "" },
      { name: "Completed Courses", value: formData.completedCourses || "" },
      { name: "Skills", value: formData.skills || "" },
      { name: "Time Commitment", value: formData.timeCommitment || "" },
      { name: "Additional Context", value: formData.additionalContext || "" },
    ];

    // Build NeuralSeek request body
    const requestBody = {
      agent: "SBU_ADVISOR", // replace this with your actual agent name from NeuralSeek
      params,
      options: {
        streaming: false,
        timeout: 600000,
        temperatureMod: 1,
        maxTokens: 2000,
        returnVariablesExpanded: true,
      },
    };

    // Make POST request to NeuralSeek
    const response = await axios.post(
      process.env.NEURALSEEK_URL, // Base NeuralSeek endpoint
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEURALSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
        params: {
          overrideschema: "true", // tells NeuralSeek to use params and agent
          overrideagent: "SBU_ADVISOR", // same agent name
        },
      }
    );

    // Extract and store JSON roadmap result
    const roadmapData = response.data.json;
    console.log(roadmapData);

    const roadmap = new Roadmap({
      title: formData.targetRole,
      formData,
      roadmap: roadmapData,
    });

    const saved = await roadmap.save();

    res.status(200).json(saved);
  } catch (err) {
    console.error(
      "❌ Error generating roadmap:",
      err.response?.data || err.message
    );
    res.status(500).json({ error: "Failed to generate roadmap" });
  }
});

module.exports = router;
