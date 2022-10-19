import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import moment, { Moment } from "moment";
import { useSnackbar } from "notistack";
import * as React from "react";

import { useAppDispatch } from "../../hooks";
import {
  fetchOpenings,
  useFetchOpenings,
} from "../../hooks/services/useOpenings";
import { fetchOrders, useFetchOrders } from "../../hooks/services/useOrders";
import {
  createProgress,
  fetchProgresses,
  useFetchProgresses,
} from "../../hooks/services/useProgresses";
import { fetchStops, useFetchStops } from "../../hooks/services/useStops";
import { ProgressType } from "../../models";
import { isProgressCreationAcceptable } from "../../utils/logic/isProgressCreationAcceptable";
import NewProgressesTable from "./NewProgressesTable";

function ProgressCreatePageContent() {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { openings, error: openingError } = useFetchOpenings(dispatch);
  const { stops, error: stopError } = useFetchStops(dispatch);
  const { orders, error: orderError } = useFetchOrders(dispatch);
  const { progresses, error: progressError } = useFetchProgresses(dispatch);

  React.useEffect(() => {
    if (openingError !== null) {
      fetchOpenings(dispatch);
    }
    if (stopError !== null) {
      fetchStops(dispatch);
    }
    if (orderError !== null) {
      fetchOrders(dispatch);
    }
    if (progressError !== null) {
      fetchProgresses(dispatch);
    }
  }, [openingError, orderError, progressError, stopError]);

  const [order, setOrder] = React.useState<number>();
  const [startDate, setStartDate] = React.useState<Moment | null>(moment());
  const [endDate, setEndDate] = React.useState<Moment | null>(moment());
  const [newProgresses, setNewProgresses] = React.useState<ProgressType[]>([]);

  const handleSubmit = () => {
    if (order && startDate && endDate) {
      if (
        isProgressCreationAcceptable(
          enqueueSnackbar,
          openings,
          progresses,
          stops,
          order,
          startDate,
          endDate
        )
      ) {
        const newProgress = {
          data: moment(startDate).format("YYYY-MM-DD"),
          datacreazione: moment().format("YYYY-MM-DD HH:mm:ss"),
          disabilitato: 0,
          fineavanzamento: moment(endDate).format("YYYY-MM-DD HH:mm:ss"),
          inizioavanzamento: moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
          opsid: order,
        };
        createProgress(dispatch, newProgress);
        setNewProgresses([...newProgresses, newProgress]);
      }
    } else {
      enqueueSnackbar("Mancano alcuni dati.", {
        variant: "error",
      });
    }
  };

  React.useEffect(() => {
    if (orders && orders.length > 0) {
      setOrder(orders[0].id);
    }
  }, [orders]);

  return (
    <Stack direction="column" spacing={3}>
      <Typography color="textPrimary" sx={{ fontWeight: 800 }} variant="h4">
        CREAZIONE AVANZAMENTO
      </Typography>
      {stopError || openingError || progressError || orderError || (
        <Stack direction="row" spacing={3}>
          <FormControl>
            <InputLabel shrink id="order-select-label">
              Ordine
            </InputLabel>
            <Select
              label="Ordine"
              labelId="order-select-label"
              value={order ? order.toString() : "0"}
              variant="outlined"
              onChange={(event: SelectChangeEvent) => {
                setOrder(parseInt(event.target.value, 10) as number);
              }}
            >
              {orders.map((orderElement) => (
                <MenuItem key={orderElement.id} value={orderElement.id}>
                  {orderElement.id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <DateTimePicker
            ampm={false}
            inputFormat="DD/MM/YYYY HH:mm"
            label="Data e ora inizio"
            maxDate={moment()}
            minutesStep={5}
            renderInput={(params) => <TextField {...params} />}
            value={startDate}
            onChange={(newValue: Moment | null) => {
              setStartDate(newValue);
            }}
          />
          <DateTimePicker
            ampm={false}
            inputFormat="DD/MM/YYYY HH:mm"
            label="Data e ora fine"
            maxDate={moment()}
            minutesStep={5}
            renderInput={(params) => <TextField {...params} />}
            value={endDate}
            onChange={(newValue: Moment | null) => {
              setEndDate(newValue);
            }}
          />
          <Button color="primary" onClick={handleSubmit}>
            Crea
          </Button>
        </Stack>
      )}
      {newProgresses.length > 0 ? (
        <NewProgressesTable newProgresses={newProgresses} />
      ) : undefined}
    </Stack>
  );
}

export default ProgressCreatePageContent;
