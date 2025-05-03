import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import MDBox from "components/MDBox";

function LockedModule({ module, onUnlock }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title={`${module.order}. ${module.title}`}
        subheader={module.description}
      />
      <CardContent>
        <MDBox 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          justifyContent="center"
          p={4}
        >
          <LockIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            This module is locked
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Purchase this module to access the slide, video, and text content.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => onUnlock(module.order)}
          >
            Purchase to Unlock
          </Button>
        </MDBox>
      </CardContent>
    </Card>
  );
}

export default LockedModule;