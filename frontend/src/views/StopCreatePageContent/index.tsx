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
  fetchMachines,
  useFetchMachines,
} from "../../hooks/services/useMachines";
import {
  fetchOpenings,
  useFetchOpenings,
} from "../../hooks/services/useOpenings";
import { fetchReasons, useFetchReasons } from "../../hooks/services/useReasons";
import {
  createStop,
  fetchStops,
  useFetchStops,
} from "../../hooks/services/useStops";
import { ReasonType, StopType } from "../../models";
import { isStopCreationAcceptable } from "../../utils";
import NewStopsTable from "./NewStopsTable";

function StopCreatePageContent() {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { openings, error: openingError } = useFetchOpenings(dispatch);
  const { stops, error: stopError } = useFetchStops(dispatch);
  const { reasons, error: reasonError } = useFetchReasons(dispatch);
  const { machines, error: machineError } = useFetchMachines(dispatch);

  React.useEffect(() => {
    if (openingError !== null) {
      fetchOpenings(dispatch);
    }
    if (stopError !== null) {
      fetchStops(dispatch);
    }
    if (reasonError !== null) {
      fetchReasons(dispatch);
    }
    if (machineError !== null) {
      fetchMachines(dispatch);
    }
  }, [openingError, stopError, reasonError, machineError]);

  const [machine, setMachine] = React.useState("");
  const [reason, setReason] = React.useState<number>();
  const [startDate, setStartDate] = React.useState<Moment | null>(moment());
  const [endDate, setEndDate] = React.useState<Moment | null>(moment());
  const [newStops, setNewStops] = React.useState<StopType[]>([]);

  const handleSubmit = () => {
    if (startDate && endDate && reason && machine) {
      if (
        isStopCreationAcceptable(
          enqueueSnackbar,
          openings,
          stops,
          machine,
          startDate,
          endDate
        )
      ) {
        const newStop = {
          causale: reason,
          data: moment(startDate).format("YYYY-MM-DD"),
          datacreazione: moment().format("YYYY-MM-DD HH:mm:ss"),
          disabilitato: 0,
          finefermo: moment(endDate).format("YYYY-MM-DD HH:mm:ss"),
          iniziofermo: moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
          macchina: machine,
        };
        createStop(dispatch, newStop);
        setNewStops([...newStops, newStop]);
      }
    } else {
      enqueueSnackbar("Mancano alcuni dati.", {
        variant: "error",
      });
    }
  };

  React.useEffect(() => {
    if (machines && machines.length > 0) {
      setMachine(machines[0].COD_MACCHINA);
    }
    if (reasons && reasons.length > 0) {
      setReason(
        reasons.find((causale: ReasonType) => causale.tipo === "fermo")!.id
      );
    }
  }, [machines, reasons]);

  return (
    <Stack direction="column" spacing={3}>
      <Typography color="textPrimary" sx={{ fontWeight: 800 }} variant="h4">
        CREAZIONE FERMO
      </Typography>
      {machineError || stopError || openingError || reasonError || (
        <Stack direction="row" spacing={3}>
          <FormControl>
            <InputLabel shrink id="machine-select-label">
              Macchina
            </InputLabel>
            <Select
              label="Macchina"
              labelId="machine-select-label"
              value={machine}
              variant="outlined"
              onChange={(event: SelectChangeEvent) => {
                setMachine(event.target.value as string);
              }}
            >
              {machines.map((macchina) => (
                <MenuItem
                  key={macchina.COD_MACCHINA}
                  value={macchina.COD_MACCHINA}
                >
                  {macchina.COD_MACCHINA}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel shrink id="reason-select-label">
              Causale
            </InputLabel>
            <Select
              label="Causale"
              labelId="reason-select-label"
              value={reason ? reason.toString() : "0"}
              variant="outlined"
              onChange={(event: SelectChangeEvent) => {
                setReason(parseInt(event.target.value, 10) as number);
              }}
            >
              {reasons.map((causale) =>
                causale.tipo === "fermo" ? (
                  <MenuItem key={causale.id} value={causale.id}>
                    {causale.descrizione}
                  </MenuItem>
                ) : undefined
              )}
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
      {newStops.length > 0 ? <NewStopsTable newStops={newStops} /> : undefined}
    </Stack>
  );
}

export default StopCreatePageContent;
