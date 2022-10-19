import { Box, Collapse, TableCell, TableRow, Typography } from "@mui/material";
import React from "react";

import { ProgressType, StopType } from "../../../models";
import DetailsTableProgresses from "./DetailsTableProgresses";
import DetailsTableStops from "./DetailsTableStops";

type Props = {
  open: boolean;
  progressesThisDate: ProgressType[];
  stopsThisOpening: StopType[];
};

function DetailsCollapsible({
  open,
  progressesThisDate,
  stopsThisOpening,
}: Props) {
  return (
    <TableRow>
      {open ? (
        <>
          {open ? (
            <Typography sx={{ m: 3 }} variant="h5">
              Dettagli Apertura
            </Typography>
          ) : undefined}
          <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
            <Collapse unmountOnExit in={open} timeout="auto">
              <Box sx={{ margin: 1 }}>
                <Typography variant="h5">Progressi</Typography>
                <DetailsTableProgresses
                  progressesThisDate={progressesThisDate}
                />
              </Box>
            </Collapse>
          </TableCell>
          <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
            <Collapse unmountOnExit in={open} timeout="auto">
              <Box sx={{ margin: 1 }}>
                <Typography variant="h5">Fermi</Typography>
                <DetailsTableStops stopsThisOpening={stopsThisOpening} />
              </Box>
            </Collapse>
          </TableCell>
        </>
      ) : undefined}
    </TableRow>
  );
}

export default DetailsCollapsible;
