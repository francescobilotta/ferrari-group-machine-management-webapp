import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Moment } from "moment";
import * as React from "react";

function NewOpeningsRow({
  opening,
}: {
  opening: {
    date: Moment;
    endHour: Moment;
    machine: string;
    startHour: Moment;
    isValid: string;
  };
}) {
  return (
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell>{opening.isValid}</TableCell>
      <TableCell>{opening.machine}</TableCell>
      <TableCell>{opening.date.format("DD/MM/YYYY")}</TableCell>
      <TableCell>{opening.startHour.format("DD/MM/YYYY HH:mm:ss")}</TableCell>
      <TableCell>{opening.endHour.format("DD/MM/YYYY HH:mm:ss")}</TableCell>
    </TableRow>
  );
}

function NewOpeningsTable({
  newOpenings,
}: {
  newOpenings: {
    date: Moment;
    endHour: Moment;
    machine: string;
    startHour: Moment;
    isValid: string;
  }[];
}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Valida?</TableCell>
            <TableCell>Macchina</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Inizio Pianificato</TableCell>
            <TableCell>Fine Pianificata</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newOpenings.map((opening) => (
            <NewOpeningsRow opening={opening} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default NewOpeningsTable;
