import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { DesktopDatePicker, TimePicker } from "@mui/x-date-pickers";
import moment, { Moment } from "moment";
import React from "react";

import { MachineType } from "../../models";

function SingleCreationForm({
  machines,
  handleSubmit,
  handleNewOpenings,
}: {
  machines: MachineType[];
  handleNewOpenings: (
    newEntries: {
      date: Moment;
      endHour: Moment;
      machine: string;
      startHour: Moment;
      isValid: string;
    }[]
  ) => void;
  handleSubmit: (
    machineElement: string,
    dateElement: moment.Moment | null,
    startHourElement: moment.Moment | null,
    endHourElement: moment.Moment | null
  ) => boolean | string;
}) {
  const [machine, setMachine] = React.useState("");
  const [date, setDate] = React.useState<Moment | null>(null);
  const [startHour, setStartHour] = React.useState<Moment | null>(null);
  const [endHour, setEndHour] = React.useState<Moment | null>(null);
  const [finishesNextDay, setFinishesNextDay] = React.useState(false);

  const fixDate = (newDate: Moment | null) => {
    setStartHour(
      moment(
        `${moment(newDate).format("YYYY-MM-DD")} ${moment(startHour).format(
          "HH:mm:ss"
        )}`,
        "YYYY-MM-DD HH:mm:ss"
      )
    );
    setEndHour(
      moment(
        `${moment(newDate).format("YYYY-MM-DD")} ${moment(endHour).format(
          "HH:mm:ss"
        )}`,
        "YYYY-MM-DD HH:mm:ss"
      )
    );
  };

  React.useEffect(() => {
    if (machines && machines.length > 0) {
      setMachine(machines[0].COD_MACCHINA);
    }
  }, [machines]);

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
  }, [finishesNextDay, date, startHour, endHour]);

  return (
    <Stack direction="row" spacing={3}>
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
                "HH:mm:ss"
              )}`,
              "YYYY-MM-DD HH:mm:ss"
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
                "HH:mm:ss"
              )}`,
              "YYYY-MM-DD HH:mm:ss"
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
      <Button
        color="primary"
        onClick={() => {
          const openingCreation = handleSubmit(
            machine,
            date,
            startHour,
            endHour
          );
          if (date !== null && endHour !== null && startHour !== null) {
            if (openingCreation === true) {
              handleNewOpenings([
                {
                  date: date,
                  endHour: endHour,
                  isValid: "Valido",
                  machine: machine,
                  startHour: startHour,
                },
              ]);
            } else if (typeof openingCreation === "string") {
              handleNewOpenings([
                {
                  date: date,
                  endHour: endHour,
                  isValid: openingCreation,
                  machine: machine,
                  startHour: startHour,
                },
              ]);
            }
          }
        }}
      >
        Crea
      </Button>
    </Stack>
  );
}

export default SingleCreationForm;
