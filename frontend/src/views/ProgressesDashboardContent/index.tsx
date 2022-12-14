import { Box, Button, Link, Stack, Typography } from "@mui/material";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

import CollapsibleTable from "./CollapsibleTable";

function ProgressesDashboardContent() {
  return (
    <Stack direction="column">
      <Stack direction="row" sx={{ alignItems: "center" }}>
        <Box m={1} p={1}>
          <Typography color="textPrimary" sx={{ fontWeight: 800 }} variant="h4">
            DASHBOARD AVANZAMENTI
          </Typography>
        </Box>
        <Link component={RouterLink} to="/admin/create-progress">
          <Button
            sx={{ bgcolor: "#1c6fe6", textDecoration: "none" }}
            variant="contained"
          >
            Crea Avanzamento
          </Button>
        </Link>
      </Stack>
      <CollapsibleTable />
    </Stack>
  );
}

export default ProgressesDashboardContent;
