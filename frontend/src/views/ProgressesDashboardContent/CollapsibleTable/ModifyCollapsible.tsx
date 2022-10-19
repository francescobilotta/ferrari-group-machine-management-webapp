import {
  Box,
  Button,
  Collapse,
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
import { updateProgress } from "../../../hooks/services/useProgresses";
import { OpeningType, ProgressType, StopType } from "../../../models";
import { isProgressUpdateAcceptable } from "../../../utils";

function ModifyForm({
  dispatch,
  progress,
  progresses,
  stops,
  openings,
}: {
  dispatch: any;
  progress: ProgressType;
  progresses: ProgressType[];
  stops: StopType[];
  openings: OpeningType[];
}) {
  const { enqueueSnackbar } = useSnackbar();

  const [startDate, setStartDate] = React.useState<Moment | null>(
    moment(progress.inizioavanzamento, "YYYY-MM-DD HH:mm")
  );
  const [endDate, setEndDate] = React.useState<Moment | null>(
    moment(progress.fineavanzamento, "YYYY-MM-DD HH:mm")
  );

  const handleSubmit = () => {
    if (startDate && endDate && progress.id !== undefined) {
      if (
        isProgressUpdateAcceptable(
          enqueueSnackbar,
          openings,
          progresses,
          stops,
          progress.id,
          progress.opsid,
          startDate,
          endDate
        )
      ) {
        const progressUpdate = {
          data: moment(startDate).format("YYYY-MM-DD"),
          datacreazione: progress.datacreazione,
          disabilitato: 0,
          fineavanzamento: moment(endDate).format("YYYY-MM-DD HH:mm:ss"),
          id: progress.id,
          inizioavanzamento: moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
          opsid: progress.opsid,
        };
        updateProgress(dispatch, progressUpdate);
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
        <TextField
          label="Ordine"
          value={progress.opsid.toString()}
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
        />
        <DateTimePicker
          inputFormat="DD/MM/YYYY HH:mm"
          label="Data Creazione"
          renderInput={(params) => <TextField {...params} />}
          value={moment(progress.datacreazione, "YYYY-MM-DD HH:mm")}
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
  progress,
  openings,
  stops,
  progresses,
}: {
  open: boolean;
  progress: ProgressType;
  openings: OpeningType[];
  stops: StopType[];
  progresses: ProgressType[];
}) {
  const dispatch = useAppDispatch();

  return (
    <TableRow>
      {open ? (
        <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse unmountOnExit in={open} timeout="auto">
            <Box sx={{ margin: 1 }}>
              <Typography gutterBottom component="div" variant="h6">
                Modifica Avanzamento
              </Typography>
              <ModifyForm
                dispatch={dispatch}
                openings={openings}
                progress={progress}
                progresses={progresses}
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
