import {
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
import * as React from "react";

import { useAppDispatch } from "../../../hooks";
import {
  fetchOpenings,
  useFetchOpenings,
} from "../../../hooks/services/useOpenings";
import {
  deleteProgress,
  fetchProgresses,
  useFetchProgresses,
} from "../../../hooks/services/useProgresses";
import { fetchStops, useFetchStops } from "../../../hooks/services/useStops";
import { ProgressType } from "../../../models";
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
    if (stopError !== null) {
      fetchStops(dispatch);
    }
    if (progressError !== null) {
      fetchProgresses(dispatch);
    }
  }, [openingError, progressError, stopError]);

  const [filteredProgresses, setFilteredProgresses] = React.useState<
    ProgressType[]
  >([]);
  const [orderSearch, setOrderSearch] = React.useState("");
  const [dateSearch, setDateSearch] = React.useState("");

  const handleDelete = (progressToDelete: number) => {
    deleteProgress(dispatch, progressToDelete);
  };

  React.useEffect(() => {
    if (orderSearch.length !== 0 && dateSearch.length !== 0) {
      setFilteredProgresses(
        progresses.filter(
          (progress) =>
            progress.opsid === parseInt(orderSearch, 10) &&
            progress.data.includes(dateSearch)
        )
      );
    } else if (orderSearch.length !== 0 || dateSearch.length !== 0) {
      setFilteredProgresses(
        progresses.filter((progress) =>
          // eslint-disable-next-line no-nested-ternary
          orderSearch.length !== 0
            ? progress.opsid === parseInt(orderSearch, 10)
            : false || dateSearch.length !== 0
            ? progress.data.includes(dateSearch)
            : false
        )
      );
    } else {
      setFilteredProgresses(progresses);
    }
  }, [orderSearch, dateSearch, progresses]);

  return (
    <>
      <Stack direction="row" spacing={4}>
        <TextField
          label="Cerca ordine"
          type="text"
          value={orderSearch}
          variant="standard"
          onChange={(e) => setOrderSearch(e.target.value)}
        />
        <TextField
          label="Cerca data"
          type="text"
          value={dateSearch}
          variant="standard"
          onChange={(e) => setDateSearch(e.target.value)}
        />
      </Stack>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Ordine</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Inizio Avanzamento</TableCell>
              <TableCell>Fine Avanzamento</TableCell>
              <TableCell>Data Creazione</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {openingError ||
              stopError ||
              progressError ||
              (filteredProgresses.length > 0 &&
                filteredProgresses.map((progress) => (
                  <Row
                    key={progress.id}
                    handleDelete={handleDelete}
                    openings={openings}
                    progress={progress}
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
