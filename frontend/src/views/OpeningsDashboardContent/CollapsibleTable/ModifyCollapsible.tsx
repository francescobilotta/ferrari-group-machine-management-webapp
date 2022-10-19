import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  Stack,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  DateTimePicker,
  DesktopDatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import moment, { Moment } from "moment";
import { useSnackbar } from "notistack";
import React from "react";

import { useAppDispatch } from "../../../hooks";
import { updateOpening } from "../../../hooks/services/useOpenings";
import { OpeningType } from "../../../models";
import { isOpeningUpdateAcceptable } from "../../../utils";

function ModifyForm({
  dispatch,
  opening,
  openings,
}: {
  dispatch: any;
  opening: OpeningType;
  openings: OpeningType[];
}) {
  const { enqueueSnackbar } = useSnackbar();

  const [date, setDate] = React.useState<Moment | null>(moment(opening.data));
  const [startHour, setStartHour] = React.useState<Moment | null>(
    moment(opening.iniziopianificato, "YYYY-MM-DD HH:mm")
  );
  const [endHour, setEndHour] = React.useState<Moment | null>(
    moment(opening.finepianificata, "YYYY-MM-DD HH:mm")
  );
  const [finishesNextDay, setFinishesNextDay] = React.useState(false);

  const fixDate = (newDate: Moment | null) => {
    setStartHour(
      moment(
        `${moment(newDate).format("YYYY-MM-DD")} ${moment(startHour).format(
          "HH:mm"
        )}`,
        "YYYY-MM-DD HH:mm"
      )
    );
    setEndHour(
      moment(
        `${moment(newDate).format("YYYY-MM-DD")} ${moment(endHour).format(
          "HH:mm"
        )}`,
        "YYYY-MM-DD HH:mm"
      )
    );
  };

  const handleSubmit = () => {
    if (date && startHour && endHour) {
      if (
        isOpeningUpdateAcceptable(
          enqueueSnackbar,
          openings,
          opening,
          opening.macchina,
          startHour,
          endHour
        )
      ) {
        const openingUpdate = {
          data: moment(date).format("YYYY-MM-DD"),
          datacreazione: opening.datacreazione,
          disabilitato: 0,
          fineeffettiva: "0000-00-00 00:00:00",
          finepianificata: moment(endHour).format("YYYY-MM-DD HH:mm:ss"),
          id: opening.id,
          inizioeffettivo: "0000-00-00 00:00:00",
          iniziopianificato: moment(startHour).format("YYYY-MM-DD HH:mm:ss"),
          macchina: opening.macchina,
          modificato: 0,
        };
        updateOpening(dispatch, openingUpdate);
      }
    } else {
      enqueueSnackbar("Mancano alcuni dati.", {
        variant: "error",
      });
    }
  };

  React.useEffect(() => {
    if (endHour) {
      if (finishesNextDay) {
        setEndHour(
          moment(
            `${moment(date).add(1, "days").format("YYYY-MM-DD")} ${moment(
              endHour
            ).format("hh:mm")}`,
            "YYYY-MM-DD hh:mm"
          )
        );
      } else {
        setEndHour(
          moment(
            `${moment(date).format("YYYY-MM-DD")} ${moment(endHour).format(
              "hh:mm"
            )}`,
            "YYYY-MM-DD hh:mm"
          )
        );
      }
    }
  }, [finishesNextDay, date]);

  return (
    <Stack direction="column" spacing={3}>
      <Stack direction="row" spacing={2}>
        <TextField
          defaultValue={opening.macchina}
          id="standard-read-only-input"
          label="Macchina"
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          defaultValue={opening.modificato === 0 ? "No" : "Si"}
          id="standard-read-only-input"
          label="Modificato"
          InputProps={{
            readOnly: true,
          }}
        />
        <DateTimePicker
          inputFormat="DD/MM/YYYY HH:mm:ss"
          label="Data Creazione"
          renderInput={(params) => <TextField {...params} />}
          value={moment(opening.datacreazione, "YYYY-MM-DD HH:mm:ss")}
          InputProps={{
            readOnly: true,
          }}
          onChange={() => null}
        />
        {opening.inizioeffettivo === "0000-00-00 00:00:00" ? (
          <Button color="primary" onClick={handleSubmit}>
            Modifica
          </Button>
        ) : (
          "Non modificabile"
        )}
      </Stack>

      <Stack direction="row" spacing={2}>
        <DesktopDatePicker
          inputFormat="DD/MM/YYYY"
          label="Data"
          renderInput={(params) => <TextField {...params} />}
          value={date}
          onChange={(newValue: Moment | null) => {
            setDate(newValue);
            fixDate(newValue);
          }}
        />
        <TimePicker
          ampm={false}
          disabled={!date}
          inputFormat="HH:mm"
          label="Ora inizio"
          minutesStep={5}
          renderInput={(params) => <TextField {...params} />}
          value={startHour}
          onChange={(newValue: Moment | null) => {
            setStartHour(
              moment(
                `${moment(date).format("YYYY-MM-DD")} ${moment(newValue).format(
                  "HH:mm"
                )}`,
                "YYYY-MM-DD HH:mm"
              )
            );
          }}
        />
        <TimePicker
          ampm={false}
          disabled={!date}
          inputFormat="HH:mm"
          label="Ora fine"
          minutesStep={5}
          renderInput={(params) => <TextField {...params} />}
          value={endHour}
          onChange={(newValue: Moment | null) => {
            setEndHour(
              moment(
                `${moment(date).format("YYYY-MM-DD")} ${moment(newValue).format(
                  "HH:mm"
                )}`,
                "YYYY-MM-DD HH:mm"
              )
            );
          }}
        />
        <FormControlLabel
          label="Finisce giorno dopo?"
          control={
            <Checkbox
              checked={finishesNextDay}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFinishesNextDay(event.target.checked);
              }}
            />
          }
        />
      </Stack>
    </Stack>
  );
}

function ModifyCollapsible({
  open,
  opening,
  openings,
}: {
  open: boolean;
  opening: OpeningType;
  openings: OpeningType[];
}) {
  const dispatch = useAppDispatch();
  return (
    <TableRow>
      {open ? (
        <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse unmountOnExit in={open} timeout="auto">
            <Box sx={{ margin: 1 }}>
              <Typography gutterBottom component="div" variant="h6">
                Modifica Apertura
              </Typography>
              <ModifyForm
                dispatch={dispatch}
                opening={opening}
                openings={openings}
              />
            </Box>
          </Collapse>
        </TableCell>
      ) : undefined}
    </TableRow>
  );
}

export default ModifyCollapsible;
