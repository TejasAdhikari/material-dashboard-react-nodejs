import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Tabs,
  Tab,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import MDBox from "components/MDBox";

function Module({ module }) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderTabContent = () => {
    switch (tabValue) {
      case 0: // Slide
        return (
          <MDBox p={2} textAlign="center">
            <SlideshowIcon sx={{ fontSize: 80, color: "primary.main", mb: 2 }} />
            <Typography variant="body1">
              Slide content for {module.title}
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<SlideshowIcon />}
              href={module.slideUrl}
              target="_blank"
              sx={{ mt: 2 }}
            >
              View Slide
            </Button>
          </MDBox>
        );
      case 1: // Video
        return (
          <MDBox p={2} textAlign="center">
            <PlayArrowIcon sx={{ fontSize: 80, color: "primary.main", mb: 2 }} />
            <Typography variant="body1">
              Video content for {module.title}
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<PlayArrowIcon />}
              href={module.videoUrl}
              target="_blank"
              sx={{ mt: 2 }}
            >
              Watch Video
            </Button>
          </MDBox>
        );
      case 2: // Text
        return (
          <MDBox p={2}>
            <Typography variant="body1">
              {module.content}
            </Typography>
          </MDBox>
        );
      default:
        return null;
    }
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title={`${module.order}. ${module.title}`}
        subheader={module.description}
      />
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab icon={<SlideshowIcon />} label="Slide" />
        <Tab icon={<PlayArrowIcon />} label="Video" />
        <Tab icon={<TextSnippetIcon />} label="Text" />
      </Tabs>
      <CardContent>
        {renderTabContent()}
      </CardContent>
    </Card>
  );
}

export default Module;