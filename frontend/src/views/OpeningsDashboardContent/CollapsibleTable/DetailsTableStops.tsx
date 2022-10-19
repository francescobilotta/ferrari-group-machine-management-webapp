import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import React from "react";

import { StopType } from "../../../models";
import { isCurrent } from "../../../utils";

function DetailsTableRowStops({ stop }: { stop: StopType }) {
  const { data, iniziofermo, finefermo, macchina, causale } = stop;

  return (
    <TableRow>
      <TableCell>{moment(data, "YYYY-MM-DD").format("DD/MM/YYYY")}</TableCell>
      <TableCell>
        {moment(iniziofermo, "YYYY-MM-DD HH:mm:ss").format(
          "DD/MM/YYYY HH:mm:ss"
        )}
      </TableCell>
      <TableCell>
        {moment(isCurrent(iniziofermo, finefermo)).isValid()
          ? moment(
              isCurrent(iniziofermo, finefermo),
              "YYYY-MM-DD HH:mm:ss"
            ).format("DD/MM/YYYY HH:mm:ss")
          : isCurrent(iniziofermo, finefermo)}
      </TableCell>
      <TableCell>{macchina}</TableCell>
      <TableCell>{causale}</TableCell>
    </TableRow>
  );
}

function DetailsTableStops({
  stopsThisOpening,
}: {
  stopsThisOpening: StopType[];
}) {
  return (
    <Stack direction="row" justifyContent="space-around" spacing={2}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Inizio</TableCell>
            <TableCell>Fine</TableCell>
            <TableCell>Macchina</TableCell>
            <TableCell>Causale</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stopsThisOpening.map((stop) => (
            <DetailsTableRowStops stop={stop} />
          ))}
        </TableBody>
      </Table>
    </Stack>
  );
}

export default DetailsTableStops;
