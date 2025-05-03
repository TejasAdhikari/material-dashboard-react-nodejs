import mongoose from "mongoose";


// Define the module schema first
// This schema represents the structure of each module within a course
const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isUnlocked: {
    type: Boolean,
    default: false
  },
  slideUrl: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  }
});


// Define the course schema
// This schema represents the structure of a course, which contains multiple modules
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  modules: [moduleSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});


// Create the Course model using the course schema
export const courseModel = mongoose.model("Course", courseSchema);