import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Grid,
  Typography,
  Container,
  Divider,
  Alert,
  Skeleton,
} from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Module from "./Module";
import LockedModule from "./LockedModule";
import CourseService from "services/course-service";

function Course() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // In a real app, this would come from the URL params
  // For this demo, we'll use a fixed course ID since we only have one course
  const courseId = "course-1";

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await CourseService.getAllCourses();
        // For simplicity, we'll just get the first course
        setCourse(response.data[0]);
        setError(null);
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Failed to load course. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, []);

  const handleUnlockModule = async (moduleOrder) => {
    try {
      // In a real app, this would open a payment modal or process a purchase
      // For this demo, we'll just call the unlock API directly
      await CourseService.unlockModule(course._id, moduleOrder);
      
      // Update the local state to reflect the change
      setCourse(prevCourse => ({
        ...prevCourse,
        modules: prevCourse.modules.map(module => {
          if (module.order === moduleOrder) {
            return { ...module, isUnlocked: true };
          }
          return module;
        })
      }));
    } catch (err) {
      console.error("Error unlocking module:", err);
      setError("Failed to unlock module. Please try again later.");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            {loading ? (
              <Card>
                <MDBox p={3}>
                  <Skeleton height={60} width="60%" />
                  <Skeleton height={40} width="40%" />
                  <Skeleton height={400} />
                </MDBox>
              </Card>
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : course ? (
              <>
                <Card mb={3}>
                  <MDBox p={3}>
                    <Typography variant="h3" gutterBottom>
                      {course.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {course.description}
                    </Typography>
                  </MDBox>
                </Card>
                
                <MDBox mt={3}>
                  <Typography variant="h4" gutterBottom>
                    Course Modules
                  </Typography>
                  
                  {course.modules.sort((a, b) => a.order - b.order).map((module) => (
                    module.isUnlocked ? (
                      <Module key={module.order} module={module} />
                    ) : (
                      <LockedModule 
                        key={module.order} 
                        module={module} 
                        onUnlock={handleUnlockModule} 
                      />
                    )
                  ))}
                </MDBox>
              </>
            ) : (
              <Alert severity="info">No course found.</Alert>
            )}
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Course;