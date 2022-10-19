import {
  Delete as DeleteIcon,
  FlagCircle as FlagCircleIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  PlayCircle as PlayCircleIcon,
  StopCircle as StopCircleIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { IconButton, TableCell, TableRow } from "@mui/material";
import * as React from "react";

import {
  OrderType,
  QtyDiscardedType,
  QtyProgressedType,
  ReasonType,
} from "../../models";
import DetailsCollapsible from "./DetailsCollapsible";

type IProps = {
  order: OrderType;
  qtyDiscarded: QtyDiscardedType[];
  qtyProgressed: QtyProgressedType[];
  currentOrder: OrderType;
  reasons: ReasonType[];
  handleStartProgress: () => void;
  setOpenStopCreationDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

function Row({
  order,
  currentOrder,
  qtyProgressed,
  qtyDiscarded,
  reasons,
  handleStartProgress,
  setOpenStopCreationDialog,
}: IProps) {
  const [openDetails, setOpenDetails] = React.useState(false);
  const [qtyDiscardedThisOrder, setQtyDiscardedThisOrder] = React.useState<
    QtyDiscardedType[]
  >([]);
  const [qtyProgressedThisOrder, setQtyProgressedThisOrder] = React.useState<
    QtyProgressedType[]
  >([]);

  React.useEffect(() => {
    setQtyDiscardedThisOrder(
      qtyDiscarded.filter((qty) => qty.opsid === order.id)
    );
  }, [
    ...qtyDiscarded.map((qty) => qty.qtascartata),
    ...qtyDiscarded.map((qty) => qty.causale),
    qtyDiscarded.length,
  ]);

  React.useEffect(() => {
    setQtyProgressedThisOrder(
      qtyProgressed.filter((qty) => qty.opsid === order.id)
    );
  }, [...qtyProgressed.map((qty) => qty.qtaavanzata), qtyProgressed.length]);

  const [highestQtyProgressed, setHighestQtyProgressed] =
    React.useState<number>(0);
  React.useEffect(() => {
    if (qtyProgressedThisOrder.length > 0) {
      setHighestQtyProgressed(
        Math.max(
          ...qtyProgressedThisOrder.map((element) => element.qtaavanzata)
        )
      );
    } else {
      setHighestQtyProgressed(0);
    }
  }, [
    ...qtyProgressedThisOrder.map((qty) => qty.qtaavanzata),
    qtyProgressedThisOrder.length,
  ]);

  const [qtyDiscardedSum, setQtyDiscardedSum] = React.useState<number>(0);
  React.useEffect(() => {
    if (qtyDiscardedThisOrder.length > 0) {
      setQtyDiscardedSum(
        qtyDiscardedThisOrder.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.qtascartata,
          0
        )
      );
    } else {
      setQtyDiscardedSum(0);
    }
  });

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        {currentOrder.id === order.id ? (
          <>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpenDetails(!openDetails)}
              >
                {openDetails ? <KeyboardArrowUpIcon /> : <VisibilityIcon />}
              </IconButton>
            </TableCell>
            <TableCell>
              <IconButton onClick={() => handleStartProgress()}>
                <PlayCircleIcon />
              </IconButton>
            </TableCell>
            <TableCell>
              <IconButton onClick={() => setOpenStopCreationDialog(true)}>
                <StopCircleIcon />
              </IconButton>
            </TableCell>
            <TableCell>
              <IconButton onClick={() => null}>
                <FlagCircleIcon />
              </IconButton>
            </TableCell>
          </>
        ) : (
          <>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
          </>
        )}
        <TableCell>{order.seq}</TableCell>
        <TableCell>{order.note}</TableCell>
        <TableCell>{order.cdl}</TableCell>
        <TableCell>{order.id}</TableCell>
        <TableCell>Data Richiesta</TableCell>
        <TableCell>Codice</TableCell>
        <TableCell>Descrizione</TableCell>
        <TableCell>{order.qtaord}</TableCell>
        <TableCell>{highestQtyProgressed}</TableCell>
        <TableCell>{qtyDiscardedSum}</TableCell>
        <TableCell>Inizio Sched</TableCell>
        <TableCell>Fine Sched</TableCell>
        <TableCell>Turno</TableCell>
        <TableCell>Setup</TableCell>
        <TableCell>GG</TableCell>
        <TableCell>Ore Macc</TableCell>
        <TableCell>Cambio Fig</TableCell>
        <TableCell>Mac</TableCell>
        <TableCell>Ess</TableCell>
        <TableCell>Scalda</TableCell>
        <TableCell>MP</TableCell>
        <TableCell>MPType</TableCell>
        <TableCell>Peso MP</TableCell>
        <TableCell>Col</TableCell>
        <TableCell>ColType</TableCell>
        <TableCell>Peso Col</TableCell>
        <TableCell>Tipo Fermo</TableCell>
        <TableCell>Ore Fermo</TableCell>
        <TableCell>Alimst</TableCell>
        <TableCell>Alimst</TableCell>
        <TableCell>
          <IconButton aria-label="delete row" size="small" onClick={() => null}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <DetailsCollapsible
        open={openDetails}
        order={order}
        qtyDiscardedThisOrder={qtyDiscardedThisOrder}
        qtyProgressedThisOrder={qtyProgressedThisOrder}
        reasons={reasons}
      />
    </>
  );
}

export default Row;
