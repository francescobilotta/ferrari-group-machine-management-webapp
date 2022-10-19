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
  fetchMachines,
  useFetchMachines,
} from "../../../hooks/services/useMachines";
import {
  fetchOpenings,
  useFetchOpenings,
} from "../../../hooks/services/useOpenings";
import {
  fetchReasons,
  useFetchReasons,
} from "../../../hooks/services/useReasons";
import {
  deleteStop,
  fetchStops,
  useFetchStops,
} from "../../../hooks/services/useStops";
import { StopType } from "../../../models";
import Row from "./Row";

function CollapsibleTable() {
  const dispatch = useAppDispatch();

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

  const [filteredStops, setFilteredStops] = React.useState<StopType[]>([]);
  const [machineSearch, setMachineSearch] = React.useState("");
  const [dateSearch, setDateSearch] = React.useState("");

  const handleDelete = (stopToDelete: number) => {
    deleteStop(dispatch, stopToDelete);
  };

  React.useEffect(() => {
    if (machineSearch.length !== 0 && dateSearch.length !== 0) {
      setFilteredStops(
        stops.filter(
          (stop) =>
            stop.macchina.includes(machineSearch) &&
            stop.data.includes(dateSearch)
        )
      );
    } else if (machineSearch.length !== 0 || dateSearch.length !== 0) {
      setFilteredStops(
        stops.filter((stop) =>
          // eslint-disable-next-line no-nested-ternary
          machineSearch.length !== 0
            ? stop.macchina.includes(machineSearch)
            : false || dateSearch.length !== 0
            ? stop.data.includes(dateSearch)
            : false
        )
      );
    } else {
      setFilteredStops(stops);
    }
  }, [machineSearch, dateSearch, stops]);

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
      </Stack>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 1000, overflow: "auto" }}
      >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Macchina</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Inizio Fermo</TableCell>
              <TableCell>Fine Fermo</TableCell>
              <TableCell>Causale</TableCell>
              <TableCell>Data Creazione</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {openingError ||
              stopError ||
              reasonError ||
              machineError ||
              (filteredStops.length > 0 &&
                filteredStops.map((stop) => (
                  <Row
                    key={stop.id}
                    handleDelete={handleDelete}
                    machines={machines}
                    openings={openings}
                    reasons={reasons}
                    stop={stop}
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
