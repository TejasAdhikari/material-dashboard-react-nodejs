import express from "express";
import { courseModel } from "../schemas/course.schema.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Get all courses 
router.get("/courses", async (req, res) => {
  try {
    // Fetch all courses from the database
    const courses = await courseModel.find();
    return res.status(200).json({ data: courses });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching courses", error: error.message });
  }
});

// Get a single course by ID
router.get("/courses/:id", async (req, res) => {
  try {
    // Fetch a single course by ID from the database
    const course = await courseModel.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json({ data: course });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching course", error: error.message });
  }
});

// Unlock a module (after purchase)
router.post("/courses/:courseId/modules/:moduleOrder/unlock", async (req, res) => {
  try {
    const { courseId, moduleOrder } = req.params;
    
    // Find the course by ID and unlock the specified module
    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    
    // Find the module by order number
    const moduleIndex = course.modules.findIndex(m => m.order === parseInt(moduleOrder));
    if (moduleIndex === -1) {
      return res.status(404).json({ message: "Module not found" });
    }
    
    // Unlock the module
    course.modules[moduleIndex].isUnlocked = true;
    // Save the updated course
    await course.save();
    
    return res.status(200).json({ message: "Module unlocked successfully", data: course.modules[moduleIndex] });
  } catch (error) {
    return res.status(500).json({ message: "Error unlocking module", error: error.message });
  }
});

export default router;