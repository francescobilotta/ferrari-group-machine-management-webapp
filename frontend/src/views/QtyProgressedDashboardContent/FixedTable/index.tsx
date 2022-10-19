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
  fetchQtyProgressed,
  useFetchQtyProgressed,
} from "../../../hooks/services/useQtyProgressed";
import { QtyProgressedType } from "../../../models";
import Row from "./Row";

function FixedTable() {
  const dispatch = useAppDispatch();
  const { qtyProgressed, error: qtyProgressedError } =
    useFetchQtyProgressed(dispatch);

  React.useEffect(() => {
    if (qtyProgressedError !== null) {
      fetchQtyProgressed(dispatch);
    }
  }, [qtyProgressedError]);

  const [filteredQty, setFilteredQty] = React.useState<QtyProgressedType[]>([]);
  const [orderSearch, setOrderSearch] = React.useState("");
  const [dateSearch, setDateSearch] = React.useState("");

  React.useEffect(() => {
    if (orderSearch.length !== 0 && dateSearch.length !== 0) {
      setFilteredQty(
        qtyProgressed.filter(
          (qty) =>
            qty.opsid === parseInt(orderSearch, 10) &&
            qty.data.includes(dateSearch)
        )
      );
    } else if (orderSearch.length !== 0 || dateSearch.length !== 0) {
      setFilteredQty(
        qtyProgressed.filter((qty) =>
          // eslint-disable-next-line no-nested-ternary
          orderSearch.length !== 0
            ? qty.opsid === parseInt(orderSearch, 10)
            : false || dateSearch.length !== 0
            ? qty.data.includes(dateSearch)
            : false
        )
      );
    } else {
      setFilteredQty(qtyProgressed);
    }
  }, [orderSearch, dateSearch, qtyProgressed]);

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
              <TableCell>Ordine</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Quantità Avanzata</TableCell>
              <TableCell>Data Creazione</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {qtyProgressedError ||
              (filteredQty.length > 0 &&
                filteredQty.map((qty) => <Row key={qty.id} qty={qty} />))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default FixedTable;
