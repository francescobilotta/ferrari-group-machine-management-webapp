import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useSnackbar } from "notistack";
import React from "react";

import { useAppDispatch } from "../../hooks";
import { createQtyDiscarded } from "../../hooks/services/useQtyDiscarded";
import { fetchReasons, useFetchReasons } from "../../hooks/services/useReasons";
import { OrderType, ReasonType } from "../../models";
import { acceptOnlyNumbers } from "../../utils";

function QtyDiscardedCreationForm({
  order,
  qtyDiscardedSum,
  highestQtyProgressed,
}: {
  order: OrderType;
  qtyDiscardedSum: number;
  highestQtyProgressed: number;
}) {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { reasons, error: reasonError } = useFetchReasons(dispatch);

  React.useEffect(() => {
    if (reasonError !== null) {
      fetchReasons(dispatch);
    }
  }, [reasonError]);

  const [reason, setReason] = React.useState<number>();
  const [qtyDiscarded, setQtyDiscarded] = React.useState<number>();

  const handleSubmit = () => {
    if (reason && qtyDiscarded !== undefined) {
      if (qtyDiscarded <= highestQtyProgressed - qtyDiscardedSum) {
        const newQtyDiscarded = {
          causale: reason,
          data: moment().format("YYYY-MM-DD"),
          datacreazione: moment().format("YYYY-MM-DD HH:mm:ss"),
          disabilitato: 0,
          opsid: order.id,
          qtascartata: Math.abs(qtyDiscarded),
        };
        createQtyDiscarded(dispatch, newQtyDiscarded);
      } else {
        enqueueSnackbar("Ricontrolla i dati inseriti.", {
          variant: "error",
        });
      }
    }
  };

  React.useEffect(() => {
    if (reasons && reasons.length > 0) {
      setReason(
        reasons.find((causale: ReasonType) => causale.tipo === "scarto")!.id
      );
    }
  }, [reasons]);

  return (
    <div>
      {reasonError || (
        <Stack direction="column" spacing={1} sx={{ m: 3 }}>
          <Typography sx={{ textAlign: "left" }} variant="body1">
            Lo scarto deve essere minore o uguale a:{" "}
            {highestQtyProgressed - qtyDiscardedSum}
          </Typography>
          <Stack direction="row" spacing={3}>
            <Select
              value={reason ? reason.toString() : "0"}
              variant="outlined"
              onChange={(event: SelectChangeEvent) => {
                setReason(parseInt(event.target.value, 10) as number);
              }}
            >
              {reasons.map((causale) =>
                causale.tipo === "scarto" ? (
                  <MenuItem key={causale.id} value={causale.id}>
                    {causale.descrizione}
                  </MenuItem>
                ) : undefined
              )}
            </Select>
            <TextField
              autoFocus
              fullWidth
              label="Quantità Scartata"
              sx={{ width: "25ch" }}
              type="number"
              value={qtyDiscarded}
              onChange={(e) => {
                setQtyDiscarded(acceptOnlyNumbers(e.target.value));
              }}
            />
            <Button color="primary" onClick={handleSubmit}>
              Aggiungi
            </Button>
          </Stack>
        </Stack>
      )}
    </div>
  );
}

export default QtyDiscardedCreationForm;
