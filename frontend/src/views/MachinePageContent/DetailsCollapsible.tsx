import { Box, Collapse, TableCell, TableRow, Typography } from "@mui/material";
import React from "react";

import {
  OrderType,
  QtyDiscardedType,
  QtyProgressedType,
  ReasonType,
} from "../../models";
import DetailsTableQtyDiscarded from "./DetailsTableQtyDiscarded";
import DetailsTableQtyProgressed from "./DetailsTableQtyProgressed";
import QtyDiscardedCreationForm from "./QtyDiscardedCreationForm";

type Props = {
  open: boolean;
  order: OrderType;
  reasons: ReasonType[];
  qtyDiscardedThisOrder: QtyDiscardedType[];
  qtyProgressedThisOrder: QtyProgressedType[];
};

function DetailsCollapsible({
  open,
  order,
  reasons,
  qtyDiscardedThisOrder,
  qtyProgressedThisOrder,
}: Props) {
  const highestQtyProgressed =
    qtyProgressedThisOrder.length > 0
      ? Math.max(
          ...qtyProgressedThisOrder.map((element) => element.qtaavanzata)
        )
      : 0;

  const qtyDiscardedSum =
    qtyDiscardedThisOrder.length > 0
      ? qtyDiscardedThisOrder.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.qtascartata,
          0
        )
      : 0;

  return (
    <>
      <TableRow>
        {open ? (
          <QtyDiscardedCreationForm
            highestQtyProgressed={highestQtyProgressed}
            order={order}
            qtyDiscardedSum={qtyDiscardedSum}
          />
        ) : undefined}
      </TableRow>
      <TableRow>
        {open ? (
          <>
            <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
              <Collapse unmountOnExit in={open} timeout="auto">
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h5">
                    Qta Avanzata: {highestQtyProgressed}
                  </Typography>
                  <DetailsTableQtyProgressed
                    highestQtyProgressed={highestQtyProgressed}
                    qtyProgressedThisOrder={qtyProgressedThisOrder}
                  />
                </Box>
              </Collapse>
            </TableCell>
            <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
              <Collapse unmountOnExit in={open} timeout="auto">
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h5">
                    Qta Scartata: {qtyDiscardedSum}
                  </Typography>
                  <DetailsTableQtyDiscarded
                    qtyDiscardedThisOrder={qtyDiscardedThisOrder}
                    reasons={reasons}
                  />
                </Box>
              </Collapse>
            </TableCell>
          </>
        ) : undefined}
      </TableRow>
    </>
  );
}

export default DetailsCollapsible;
