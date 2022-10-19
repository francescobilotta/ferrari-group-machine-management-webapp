import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import * as React from "react";

import { StopType } from "../../models";

function NewStopRow({ stop }: { stop: StopType }) {
  return (
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell>{stop.macchina}</TableCell>
      <TableCell>
        {moment(stop.data, "YYYY-MM-DD").format("DD/MM/YYYY")}
      </TableCell>
      <TableCell>
        {moment(stop.iniziofermo, "YYYY-MM-DD HH:mm:ss").format(
          "DD/MM/YYYY HH:mm:ss"
        )}
      </TableCell>
      <TableCell>
        {stop.finefermo !== "0000-00-00 00:00:00"
          ? moment(stop.finefermo, "YYYY-MM-DD HH:mm:ss").format(
              "DD/MM/YYYY HH:mm:ss"
            )
          : stop.finefermo}
      </TableCell>
      <TableCell>{stop.causale}</TableCell>
      <TableCell>
        {moment(stop.datacreazione, "YYYY-MM-DD HH:mm:ss").format(
          "DD/MM/YYYY HH:mm:ss"
        )}
      </TableCell>
    </TableRow>
  );
}

function NewStopsTable({ newStops }: { newStops: StopType[] }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Macchina</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Inizio Fermo</TableCell>
            <TableCell>Fine Fermo</TableCell>
            <TableCell>Causale</TableCell>
            <TableCell>Data Immissione</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newStops.map((stop) => (
            <NewStopRow key={stop.datacreazione} stop={stop} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default NewStopsTable;
