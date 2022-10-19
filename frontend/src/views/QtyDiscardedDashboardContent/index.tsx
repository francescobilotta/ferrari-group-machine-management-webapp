import { Box, Stack, Typography } from "@mui/material";
import * as React from "react";

import FixedTable from "./FixedTable";

function QtyDiscardedDashboardContent() {
  return (
    <Stack direction="column">
      <Box m={1} p={1}>
        <Typography color="textPrimary" sx={{ fontWeight: 800 }} variant="h4">
          DASHBOARD QUANTITA SCARTATA
        </Typography>
      </Box>
      <FixedTable />
    </Stack>
  );
}

export default QtyDiscardedDashboardContent;
