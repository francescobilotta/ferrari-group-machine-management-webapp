import {
  Box,
  Button,
  Collapse,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import moment, { Moment } from "moment";
import { useSnackbar } from "notistack";
import React from "react";

import { useAppDispatch } from "../../../hooks";
import { updateStop } from "../../../hooks/services/useStops";
import {
  MachineType,
  OpeningType,
  ReasonType,
  StopType,
} from "../../../models";
import { isStopUpdateAcceptable } from "../../../utils";

function ModifyForm({
  dispatch,
  machines,
  stop,
  stops,
  openings,
  reasons,
}: {
  dispatch: any;
  machines: MachineType[];
  stop: StopType;
  stops: StopType[];
  openings: OpeningType[];
  reasons: ReasonType[];
}) {
  const { enqueueSnackbar } = useSnackbar();

  const [machine, setMachine] = React.useState(stop.macchina);
  const [reason, setReason] = React.useState(stop.causale);
  const [startDate, setStartDate] = React.useState<Moment | null>(
    moment(stop.iniziofermo, "YYYY-MM-DD HH:mm")
  );
  const [endDate, setEndDate] = React.useState<Moment | null>(
    moment(stop.finefermo, "YYYY-MM-DD HH:mm")
  );

  const handleSubmit = () => {
    if (startDate && endDate && reason && machine && stop.id !== undefined) {
      if (
        isStopUpdateAcceptable(
          enqueueSnackbar,
          openings,
          stops,
          stop.id,
          machine,
          startDate,
          endDate
        )
      ) {
        const stopUpdate = {
          causale: reason,
          data: moment(startDate).format("YYYY-MM-DD"),
          datacreazione: stop.datacreazione,
          disabilitato: 0,
          finefermo: moment(endDate).format("YYYY-MM-DD HH:mm:ss"),
          id: stop.id,
          iniziofermo: moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
          macchina: machine,
        };
        updateStop(dispatch, stopUpdate);
      }
    } else {
      enqueueSnackbar("Mancano alcuni dati.", {
        variant: "error",
      });
    }
  };

  return (
    <Stack direction="column" spacing={3}>
      <Stack direction="row" spacing={2}>
        <Select
          value={machine}
          variant="outlined"
          onChange={(event: SelectChangeEvent) => {
            setMachine(event.target.value as string);
          }}
        >
          {machines.map((macchina) => (
            <MenuItem key={macchina.COD_MACCHINA} value={macchina.COD_MACCHINA}>
              {macchina.COD_MACCHINA}
            </MenuItem>
          ))}
        </Select>
        <DateTimePicker
          inputFormat="DD/MM/YYYY HH:mm:ss"
          label="Data Creazione"
          renderInput={(params) => <TextField {...params} />}
          value={moment(stop.datacreazione, "YYYY-MM-DD HH:mm:ss")}
          InputProps={{
            readOnly: true,
          }}
          onChange={() => null}
        />
        <Button color="primary" onClick={handleSubmit}>
          Modifica
        </Button>
      </Stack>

      <Stack direction="row" spacing={2}>
        <Select
          value={reason.toString()}
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
      </Stack>
    </Stack>
  );
}

function ModifyCollapsible({
  open,
  stop,
  openings,
  stops,
  reasons,
  machines,
}: {
  open: boolean;
  stop: StopType;
  openings: OpeningType[];
  stops: StopType[];
  reasons: ReasonType[];
  machines: MachineType[];
}) {
  const dispatch = useAppDispatch();

  return (
    <TableRow>
      {open ? (
        <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse unmountOnExit in={open} timeout="auto">
            <Box sx={{ margin: 1 }}>
              <Typography gutterBottom component="div" variant="h6">
                Modifica Fermo
              </Typography>
              <ModifyForm
                dispatch={dispatch}
                machines={machines}
                openings={openings}
                reasons={reasons}
                stop={stop}
                stops={stops}
              />
            </Box>
          </Collapse>
        </TableCell>
      ) : undefined}
    </TableRow>
  );
}

export default ModifyCollapsible;
