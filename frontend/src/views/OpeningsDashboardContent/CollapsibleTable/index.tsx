import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import moment from "moment";
import * as React from "react";

import { useAppDispatch } from "../../../hooks";
import {
  deleteOpening,
  fetchOpenings,
  useFetchOpenings,
} from "../../../hooks/services/useOpenings";
import {
  fetchProgresses,
  useFetchProgresses,
} from "../../../hooks/services/useProgresses";
import { fetchStops, useFetchStops } from "../../../hooks/services/useStops";
import { OpeningType } from "../../../models";
import Row from "./Row";

function CollapsibleTable() {
  const dispatch = useAppDispatch();

  const { openings, error: openingError } = useFetchOpenings(dispatch);

  const { stops, error: stopError } = useFetchStops(dispatch);
  const { progresses, error: progressError } = useFetchProgresses(dispatch);

  React.useEffect(() => {
    if (openingError !== null) {
      fetchOpenings(dispatch);
    }
    if (progressError !== null) {
      fetchProgresses(dispatch);
    }
    if (stopError !== null) {
      fetchStops(dispatch);
    }
  }, [openingError, progressError, stopError]);

  const [filteredOpenings, setFilteredOpenings] = React.useState<OpeningType[]>(
    []
  );
  const [dateSortingAscending, setDateSortingAscending] = React.useState(false);
  const [machineSearch, setMachineSearch] = React.useState("");
  const [dateSearch, setDateSearch] = React.useState("");

  const handleDelete = (openingToDelete: number) => {
    deleteOpening(dispatch, openingToDelete);
  };

  React.useEffect(() => {
    if (machineSearch.length !== 0 && dateSearch.length !== 0) {
      setFilteredOpenings(
        openings.filter(
          (opening) =>
            opening.macchina.includes(machineSearch) &&
            opening.data.includes(dateSearch)
        )
      );
    } else if (machineSearch.length !== 0 || dateSearch.length !== 0) {
      setFilteredOpenings(
        openings.filter((opening) =>
          // eslint-disable-next-line no-nested-ternary
          machineSearch.length !== 0
            ? opening.macchina.includes(machineSearch)
            : false || dateSearch.length !== 0
            ? opening.data.includes(dateSearch)
            : false
        )
      );
    } else {
      setFilteredOpenings(openings);
    }
  }, [machineSearch, dateSearch, openings, openings.length]);

  React.useEffect(() => {
    if (dateSortingAscending) {
      setFilteredOpenings(
        [...filteredOpenings].sort((a, b) => {
          if (moment(a.data, "YYYY-MM-DD").isAfter(b.data)) {
            return -1;
          }
          if (moment(a.data, "YYYY-MM-DD").isBefore(b.data)) {
            return 1;
          }
          return 0;
        })
      );
    } else {
      setFilteredOpenings(
        [...filteredOpenings].sort((a, b) => {
          if (moment(a.data, "YYYY-MM-DD").isBefore(b.data)) {
            return -1;
          }
          if (moment(a.data, "YYYY-MM-DD").isAfter(b.data)) {
            return 1;
          }
          return 0;
        })
      );
    }
  }, [dateSortingAscending]);
  return (
    <>
      <Stack direction="row" spacing={4}>
        <TextField
          label="Cerca macchina"
          type="text"
          value={machineSearch}
          variant="standard"
          onChange={(e) => setMachineSearch(e.target.value)}
        />
        <TextField
          label="Cerca data"
          type="text"
          value={dateSearch}
          variant="standard"
          onChange={(e) => setDateSearch(e.target.value)}
        />
        <Button onClick={() => setDateSortingAscending(!dateSortingAscending)}>
          Ordina per data
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell>Macchina</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Inizio Pianificato</TableCell>
              <TableCell>Inizio Effettivo</TableCell>
              <TableCell>Fine Pianificata</TableCell>
              <TableCell>Fine Effettiva</TableCell>
              <TableCell>Modificato</TableCell>
              <TableCell>Data Immissione</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {openingError ||
              stopError ||
              progressError ||
              (filteredOpenings.length > 0 &&
                filteredOpenings.map((opening) => (
                  <Row
                    key={opening.id}
                    handleDelete={handleDelete}
                    opening={opening}
                    openings={openings}
                    progresses={progresses}
                    stops={stops}
                  />
                )))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CollapsibleTable;
