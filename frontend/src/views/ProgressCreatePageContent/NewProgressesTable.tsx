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

import { ProgressType } from "../../models";

function NewProgressRow({ progress }: { progress: ProgressType }) {
  return (
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell>{progress.opsid}</TableCell>
      <TableCell>
        {moment(progress.data, "YYYY-MM-DD").format("DD/MM/YYYY")}
      </TableCell>
      <TableCell>
        {moment(progress.inizioavanzamento, "YYYY-MM-DD HH:mm:ss").format(
          "DD/MM/YYYY HH:mm:ss"
        )}
      </TableCell>
      <TableCell>
        {moment(progress.fineavanzamento, "YYYY-MM-DD HH:mm:ss").format(
          "DD/MM/YYYY HH:mm:ss"
        )}
      </TableCell>
      <TableCell>
        {moment(progress.datacreazione, "YYYY-MM-DD HH:mm:ss").format(
          "DD/MM/YYYY HH:mm:ss"
        )}
      </TableCell>
    </TableRow>
  );
}

function NewProgressesTable({
  newProgresses,
}: {
  newProgresses: ProgressType[];
}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Ordine</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Inizio Avanzamento</TableCell>
            <TableCell>Fine Avanzamento</TableCell>
            <TableCell>Data Immissione</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newProgresses.map((progress) => (
            <NewProgressRow key={progress.datacreazione} progress={progress} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default NewProgressesTable;
