import mongoose from "mongoose";
import { dbConnect } from "./index.js";
import { courseModel } from "../schemas/course.schema.js";

async function seedCourses() {
  dbConnect();
  try {
    // Check if courses already exist
    const existingCourses = await courseModel.find();
    if (existingCourses.length > 0) {
      console.log("Courses already seeded");
      return;
    }

    const courseData = {
      title: "Web Development Fundamentals",
      description: "Learn the core concepts of modern web development in this comprehensive course.",
      modules: [
        {
          title: "Introduction to HTML",
          description: "Learn the basics of HTML structure and common elements",
          isUnlocked: true, // First module is unlocked by default
          slideUrl: "https://example.com/slides/html",
          videoUrl: "https://example.com/videos/html",
          content: "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. This module covers the basic structure of HTML documents and introduces you to the most commonly used HTML elements.",
          order: 1
        },
        {
          title: "Styling with CSS",
          description: "Learn how to style your HTML with CSS",
          isUnlocked: false,
          slideUrl: "https://example.com/slides/css",
          videoUrl: "https://example.com/videos/css",
          content: "CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML. This module covers CSS selectors, properties, and layout techniques.",
          order: 2
        },
        {
          title: "JavaScript Basics",
          description: "Introduction to JavaScript programming",
          isUnlocked: false,
          slideUrl: "https://example.com/slides/js-basics",
          videoUrl: "https://example.com/videos/js-basics",
          content: "JavaScript is a programming language that enables interactive web pages. This module covers variables, data types, operators, and basic control structures in JavaScript.",
          order: 3
        },
        {
          title: "DOM Manipulation",
          description: "Learn how to interact with the Document Object Model",
          isUnlocked: false,
          slideUrl: "https://example.com/slides/dom",
          videoUrl: "https://example.com/videos/dom",
          content: "The Document Object Model (DOM) represents the structure of an HTML document as a tree of objects. This module teaches you how to manipulate the DOM using JavaScript to create dynamic web pages.",
          order: 4
        },
        {
          title: "Responsive Design",
          description: "Create websites that work on all devices",
          isUnlocked: false,
          slideUrl: "https://example.com/slides/responsive",
          videoUrl: "https://example.com/videos/responsive",
          content: "Responsive web design makes web pages render well on a variety of devices and window or screen sizes. This module covers media queries, flexible grids, and responsive images.",
          order: 5
        },
        {
          title: "Introduction to React",
          description: "Learn the basics of the React library",
          isUnlocked: false,
          slideUrl: "https://example.com/slides/react-intro",
          videoUrl: "https://example.com/videos/react-intro",
          content: "React is a JavaScript library for building user interfaces. This module introduces React components, state, props, and the virtual DOM.",
          order: 6
        },
        {
          title: "Working with APIs",
          description: "Learn how to fetch and use data from APIs",
          isUnlocked: false,
          slideUrl: "https://example.com/slides/apis",
          videoUrl: "https://example.com/videos/apis",
          content: "APIs (Application Programming Interfaces) allow your web applications to communicate with external services. This module covers HTTP requests, RESTful APIs, and async/await in JavaScript.",
          order: 7
        },
        {
          title: "Web Performance Optimization",
          description: "Techniques to make your websites faster",
          isUnlocked: false,
          slideUrl: "https://example.com/slides/performance",
          videoUrl: "https://example.com/videos/performance",
          content: "Web performance optimization involves making websites load and run faster. This module covers image optimization, lazy loading, code splitting, and performance monitoring techniques.",
          order: 8
        }
      ]
    };

    await courseModel.create(courseData);
    console.log("Course data seeded successfully");
  } catch (error) {
    console.error("Error seeding courses:", error);
  } finally {
    await mongoose.connection.close();
  }
}

seedCourses();