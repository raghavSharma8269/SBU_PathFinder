
const mongoose = require('mongoose');

const RoadmapSchema = new mongoose.Schema({
  title: { type: String, required: true },
  roadmap: { type: mongoose.Schema.Types.Mixed, required: true },
  formData: {                                     // User-submitted form data
    targetRole: { type: String },
    currentYear: { type: String },
    targetTimeline: { type: String },
    completedCourses: { type: String },
    skills: { type: String },
    timeCommitment: { type: String },
    additionalContext: { type: String }
  }
}, { timestamps: true })

module.exports = mongoose.model('Roadmap', RoadmapSchema, 'roadmaps');
