import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import moment from "moment";
import { useSnackbar } from "notistack";
import React from "react";

import { createQtyDiscarded } from "../../hooks/services/useQtyDiscarded";
import { createQtyProgressed } from "../../hooks/services/useQtyProgressed";
import { OrderType, ProgressType } from "../../models";
import { acceptOnlyNumbers } from "../../utils";

type IProps = {
  dispatch: any;
  currentOrder: OrderType;
  daysMissingQty: ProgressType[];
  qtyDiscardedSum: number;
  highestQtyProgressed: number;
  openMissingQtyDialog: boolean;
  totalQty: number;
  setOpenMissingQtyDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

function MissingQtyDialog({
  dispatch,
  currentOrder,
  daysMissingQty,
  qtyDiscardedSum,
  highestQtyProgressed,
  openMissingQtyDialog,
  totalQty,
  setOpenMissingQtyDialog,
}: IProps) {
  const { enqueueSnackbar } = useSnackbar();

  const [qtyProgressed, setQtyProgressed] =
    React.useState(highestQtyProgressed);
  const [qtyDiscarded, setQtyDiscardedSum] = React.useState(0);

  const handleSubmit = () => {
    if (
      qtyProgressed > 0 &&
      qtyDiscarded >= 0 &&
      qtyProgressed - qtyDiscardedSum >= 0 &&
      qtyProgressed > highestQtyProgressed &&
      qtyDiscarded <= qtyProgressed - qtyDiscardedSum
    ) {
      if ((100 * qtyProgressed) / totalQty > 5) {
        if (
          // eslint-disable-next-line no-alert, no-restricted-globals
          confirm(
            "La quantità eccede del 5% il totale previsto di produzione, sei sicuro?"
          )
        ) {
          createQtyProgressed(dispatch, {
            data: daysMissingQty[0].data,
            datacreazione: moment().format("YYYY-MM-DD HH:mm:ss"),
            disabilitato: 0,
            opsid: currentOrder.id,
            qtaavanzata: Math.abs(qtyProgressed),
          });
          if (Math.abs(qtyDiscarded) !== 0) {
            createQtyDiscarded(dispatch, {
              causale: 1,
              data: daysMissingQty[0].data,
              datacreazione: moment().format("YYYY-MM-DD HH:mm:ss"),
              disabilitato: 0,
              opsid: currentOrder.id,
              qtascartata: Math.abs(qtyDiscarded),
            });
          }
        }
      } else {
        createQtyProgressed(dispatch, {
          data: daysMissingQty[0].data,
          datacreazione: moment().format("YYYY-MM-DD HH:mm:ss"),
          disabilitato: 0,
          opsid: currentOrder.id,
          qtaavanzata: Math.abs(qtyProgressed),
        });
        if (Math.abs(qtyDiscarded) !== 0) {
          createQtyDiscarded(dispatch, {
            causale: 1,
            data: daysMissingQty[0].data,
            datacreazione: moment().format("YYYY-MM-DD HH:mm:ss"),
            disabilitato: 0,
            opsid: currentOrder.id,
            qtascartata: Math.abs(qtyDiscarded),
          });
        }
      }
    } else {
      enqueueSnackbar("I dati immessi non sono conformi.", {
        variant: "error",
      });
    }
  };

  return (
    <div>
      <Dialog open={openMissingQtyDialog}>
        <DialogTitle>Quantità da aggiornare</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ATTENZIONE! Ci sono delle quantità da aggiornare per l&apos;ordine{" "}
            {currentOrder.id}.
          </DialogContentText>
          <DialogContentText>
            Inserisci la quantità LORDA del giorno {daysMissingQty[0].data}.
          </DialogContentText>
          <DialogContentText sx={{ marginTop: 3 }}>
            L&apos;avanzamento deve essere maggiore di: {highestQtyProgressed}
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            label="Quantità Avanzata"
            sx={{ marginTop: 1 }}
            type="number"
            value={qtyProgressed}
            onChange={(e) => {
              setQtyProgressed(acceptOnlyNumbers(e.target.value));
            }}
          />
          <DialogContentText sx={{ marginTop: 1 }}>
            Lo scarto fino a quel giorno è {qtyDiscardedSum} e deve essere
            minore o uguale a: {qtyProgressed - qtyDiscardedSum}
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            label="Quantità Scartata"
            sx={{ marginTop: 1 }}
            type="number"
            value={qtyDiscarded}
            onChange={(e) => {
              setQtyDiscardedSum(acceptOnlyNumbers(e.target.value));
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMissingQtyDialog(false)}>Chiudi</Button>
          <Button onClick={handleSubmit}>Invia</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MissingQtyDialog;
