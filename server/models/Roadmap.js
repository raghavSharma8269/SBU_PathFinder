
const mongoose = require('mongoose');

const RoadmapSchema = new mongoose.Schema({
  title: { type: String, required: true },
  roadmap: { type: mongoose.Schema.Types.Mixed, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Roadmap', RoadmapSchema);
