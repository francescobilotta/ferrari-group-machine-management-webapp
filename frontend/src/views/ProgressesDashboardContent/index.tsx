import { Box, Stack, Typography } from "@mui/material";
import * as React from "react";

import CollapsibleTable from "./CollapsibleTable";

function ProgressesDashboardContent() {
  return (
    <Stack direction="column">
      <Box m={1} p={1}>
        <Typography color="textPrimary" sx={{ fontWeight: 800 }} variant="h4">
          DASHBOARD AVANZAMENTI
        </Typography>
      </Box>
      <CollapsibleTable />
    </Stack>
  );
}

export default ProgressesDashboardContent;
