import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import moment, { Moment } from "moment";
import { useSnackbar } from "notistack";
import * as React from "react";

import { useAppDispatch } from "../../hooks";
import {
  fetchMachines,
  useFetchMachines,
} from "../../hooks/services/useMachines";
import {
  createOpening,
  fetchOpenings,
  useFetchOpenings,
} from "../../hooks/services/useOpenings";
import { OpeningType } from "../../models";
import { isOpeningCreationAcceptable } from "../../utils";
import MultipleCreationForm from "./MultipleCreationForm";
import NewOpeningsTable from "./NewOpeningsTable";
import SingleCreationForm from "./SingleCreationForm";

function OpeningsCreatePageContent() {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { machines, error: machineError } = useFetchMachines(dispatch);
  const { openings, error: openingError } = useFetchOpenings(dispatch);

  React.useEffect(() => {
    if (openingError !== null) {
      fetchOpenings(dispatch);
    }
    if (machineError !== null) {
      fetchMachines(dispatch);
    }
  }, [openingError, machineError]);

  const [isMultipleCreation, setIsMultipleCreation] = React.useState("false");
  const [newOpenings, setNewOpenings] = React.useState<
    {
      date: Moment;
      endHour: Moment;
      machine: string;
      startHour: Moment;
      isValid: string;
    }[]
  >([]);

  const handleNewOpenings = (
    newEntries: {
      date: Moment;
      endHour: Moment;
      machine: string;
      startHour: Moment;
      isValid: string;
    }[]
  ) => {
    setNewOpenings([...newOpenings, ...newEntries]);
  };

  const handleSubmit = (
    machineElement: string,
    dateElement: moment.Moment | null,
    startHourElement: moment.Moment | null,
    endHourElement: moment.Moment | null,
    openingsArray?: OpeningType[]
  ) => {
    if (machineElement && dateElement && startHourElement && endHourElement) {
      const newOpening = {
        data: moment(dateElement).format("YYYY-MM-DD"),
        datacreazione: moment().format("YYYY-MM-DD HH:mm:ss"),
        disabilitato: 0,
        fineeffettiva: "0000-00-00 00:00:00",
        finepianificata: moment(endHourElement).format("YYYY-MM-DD HH:mm:ss"),
        inizioeffettivo: "0000-00-00 00:00:00",
        iniziopianificato: moment(startHourElement).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        macchina: machineElement,
        modificato: 0,
      };

      const checkIsOpeningCreationAcceptable = isOpeningCreationAcceptable(
        newOpening,
        openingsArray === undefined ? openings : openingsArray
      );

      if (checkIsOpeningCreationAcceptable === true) {
        createOpening(dispatch, newOpening);
        return true;
      }
      return checkIsOpeningCreationAcceptable;
    }
    enqueueSnackbar("Mancano alcuni dati.", {
      variant: "error",
    });

    return false;
  };

  return (
    <Stack direction="column" spacing={3}>
      <Typography color="textPrimary" sx={{ fontWeight: 800 }} variant="h4">
        CREAZIONE APERTURA
      </Typography>
      {machineError || openingError || (
        <Stack direction="row" spacing={3}>
          <Select
            value={isMultipleCreation}
            onChange={(event: SelectChangeEvent) => {
              setIsMultipleCreation(event.target.value);
            }}
          >
            <MenuItem value="false">Creazione Singola</MenuItem>
            <MenuItem value="true">Creazione Multipla</MenuItem>
          </Select>

          {isMultipleCreation === "true" ? (
            <MultipleCreationForm
              handleNewOpenings={handleNewOpenings}
              handleSubmit={handleSubmit}
              openings={openings}
            />
          ) : (
            <SingleCreationForm
              handleNewOpenings={handleNewOpenings}
              handleSubmit={handleSubmit}
              machines={machines}
            />
          )}
        </Stack>
      )}
      {newOpenings.length > 0 ? (
        <NewOpeningsTable newOpenings={newOpenings} />
      ) : undefined}
    </Stack>
  );
}

export default OpeningsCreatePageContent;
