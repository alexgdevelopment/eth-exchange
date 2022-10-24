import { Container, Paper, Stack } from "@mui/material";
import React from "react";

const Section = ({ children }) => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3 }}>
        <Stack spacing={2}>{children}</Stack>
      </Paper>
    </Container>
  );
};

export default Section;
