import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import React from "react";

import { useAppDispatch } from "../../hooks";
import { deleteQtyDiscarded } from "../../hooks/services/useQtyDiscarded";
import { QtyDiscardedType, ReasonType } from "../../models";

function DetailsTableRowQtyDiscarded({
  qtyDiscarded,
  reason,
}: {
  qtyDiscarded: QtyDiscardedType;
  reason: ReasonType | undefined;
}) {
  const dispatch = useAppDispatch();
  const { id, data, qtascartata, datacreazione, opsid } = qtyDiscarded;

  const handleDelete = (qtyDiscardedToDelete: number) => {
    deleteQtyDiscarded(dispatch, qtyDiscardedToDelete);
  };

  return (
    <TableRow>
      <TableCell>{moment(data, "YYYY-MM-DD").format("DD/MM/YYYY")}</TableCell>
      <TableCell>{qtascartata}</TableCell>
      <TableCell>
        {reason === undefined
          ? "Problema, causale non trovata"
          : reason.descrizione}
      </TableCell>
      <TableCell>
        {moment(datacreazione, "YYYY-MM-DD HH:mm:ss").format(
          "DD/MM/YYYY HH:mm:ss"
        )}
      </TableCell>
      <TableCell>{opsid}</TableCell>
      <TableCell>
        <IconButton
          aria-label="delete row"
          size="small"
          onClick={() => {
            if (id) {
              if (window.confirm("Sicuro di voler cancellare?") === true) {
                handleDelete(id);
              }
            }
          }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

function DetailsTableQtyDiscarded({
  qtyDiscardedThisOrder,
  reasons,
}: {
  qtyDiscardedThisOrder: QtyDiscardedType[];
  reasons: ReasonType[];
}) {
  return (
    <Stack direction="column" justifyContent="space-around" spacing={2}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Qta Scartata</TableCell>
            <TableCell>Causale</TableCell>
            <TableCell>Data Creazione</TableCell>
            <TableCell>Ordine</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {qtyDiscardedThisOrder.map((qtyDiscarded) => (
            <DetailsTableRowQtyDiscarded
              qtyDiscarded={qtyDiscarded}
              reason={reasons.find(
                (reason) => qtyDiscarded.causale === reason.id
              )}
            />
          ))}
        </TableBody>
      </Table>
    </Stack>
  );
}

export default DetailsTableQtyDiscarded;
