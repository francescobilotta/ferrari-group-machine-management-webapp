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

import { ProgressType } from "../../../models";
import { isCurrent } from "../../../utils";

function DetailsTableRowProgresses({ progress }: { progress: ProgressType }) {
  const { data, inizioavanzamento, fineavanzamento, opsid } = progress;

  return (
    <TableRow>
      <TableCell>{moment(data, "YYYY-MM-DD").format("DD/MM/YYYY")}</TableCell>
      <TableCell>
        {moment(inizioavanzamento, "YYYY-MM-DD HH:mm:ss").format(
          "DD/MM/YYYY HH:mm:ss"
        )}
      </TableCell>
      <TableCell>
        {moment(isCurrent(inizioavanzamento, fineavanzamento)).isValid()
          ? moment(
              isCurrent(inizioavanzamento, fineavanzamento),
              "YYYY-MM-DD HH:mm:ss"
            ).format("DD/MM/YYYY HH:mm:ss")
          : isCurrent(inizioavanzamento, fineavanzamento)}
      </TableCell>
      <TableCell>{opsid}</TableCell>
    </TableRow>
  );
}

function DetailsTableProgresses({
  progressesThisDate,
}: {
  progressesThisDate: ProgressType[];
}) {
  return (
    <Stack direction="row" justifyContent="space-around" spacing={2}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Inizio</TableCell>
            <TableCell>Fine</TableCell>
            <TableCell>Ordine</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {progressesThisDate.map((progress) => (
            <DetailsTableRowProgresses progress={progress} />
          ))}
        </TableBody>
      </Table>
    </Stack>
  );
}

export default DetailsTableProgresses;
