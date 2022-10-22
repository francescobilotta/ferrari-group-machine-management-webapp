import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useSnackbar } from "notistack";
import React from "react";

import { useAppDispatch } from "../../hooks";
import {
  deleteQtyProgressed,
  updateQtyProgressed,
} from "../../hooks/services/useQtyProgressed";
import { QtyProgressedType } from "../../models";
import { acceptOnlyNumbers } from "../../utils";

function DetailsTableRowQtyProgressed({
  qtyProgressed,
  highestQtyProgressed,
}: {
  highestQtyProgressed: number;
  qtyProgressed: QtyProgressedType;
}) {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { id, data, qtaavanzata, datacreazione, opsid } = qtyProgressed;

  const [openModify, setOpenModify] = React.useState(false);
  const [newQtyProgressed, setNewQtyProgressed] = React.useState<number>(
    qtyProgressed.qtaavanzata
  );

  const handleDelete = (qtyProgressedToDelete: number) => {
    deleteQtyProgressed(dispatch, qtyProgressedToDelete);
  };

  const handleSubmit = () => {
    if (typeof newQtyProgressed === "number") {
      if (newQtyProgressed > highestQtyProgressed) {
        updateQtyProgressed(dispatch, {
          data: qtyProgressed.data,
          datacreazione: qtyProgressed.datacreazione,
          disabilitato: qtyProgressed.disabilitato,
          id: qtyProgressed.id,
          opsid: qtyProgressed.opsid,
          qtaavanzata: Math.abs(newQtyProgressed),
        });
      } else {
        enqueueSnackbar("Ricontrolla i dati inseriti.", {
          variant: "error",
        });
      }
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>
          {qtyProgressed.qtaavanzata === highestQtyProgressed ? (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpenModify(!openModify)}
            >
              {openModify ? <KeyboardArrowUpIcon /> : <EditIcon />}
            </IconButton>
          ) : undefined}
        </TableCell>
        <TableCell>{moment(data, "YYYY-MM-DD").format("DD/MM/YYYY")}</TableCell>
        <TableCell>{qtaavanzata}</TableCell>
        <TableCell>
          {moment(datacreazione, "YYYY-MM-DD HH:mm:ss").format(
            "DD/MM/YYYY HH:mm:ss"
          )}
        </TableCell>
        <TableCell>{opsid}</TableCell>
        <TableCell>
          {qtyProgressed.qtaavanzata === highestQtyProgressed ? (
            <IconButton
              aria-label="delete row"
              size="small"
              onClick={() => {
                if (id) {
                  if (window.confirm("Sicuro di voler cancellare?") === true) {
                    handleDelete(id);
                  }
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          ) : (
            "Non cancellabile"
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        {openModify ? (
          <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
            <Collapse unmountOnExit in={openModify} timeout="auto">
              <Box sx={{ margin: 1 }}>
                <Typography gutterBottom component="div" variant="h6">
                  Modifica Quantità Avanzata
                </Typography>
                <Stack direction="column" spacing={1} sx={{ m: 3 }}>
                  <Typography sx={{ textAlign: "left" }} variant="body1">
                    La quantità avanzata deve essere maggiore a:{" "}
                    {highestQtyProgressed}
                  </Typography>
                  <Stack direction="row" spacing={3}>
                    <TextField
                      autoFocus
                      fullWidth
                      label="Quantità Scartata"
                      sx={{ width: "25ch" }}
                      type="number"
                      value={newQtyProgressed}
                      onChange={(e) => {
                        setNewQtyProgressed(acceptOnlyNumbers(e.target.value));
                      }}
                    />
                    <Button color="primary" onClick={handleSubmit}>
                      Modifica
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Collapse>
          </TableCell>
        ) : undefined}
      </TableRow>
    </>
  );
}

function DetailsTableQtyProgressed({
  qtyProgressedThisOrder,
  highestQtyProgressed,
}: {
  highestQtyProgressed: number;
  qtyProgressedThisOrder: QtyProgressedType[];
}) {
  return (
    <Stack direction="row" justifyContent="space-around" spacing={2}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Data</TableCell>
            <TableCell>Qta Avanzata</TableCell>
            <TableCell>Data Creazione</TableCell>
            <TableCell>Ordine</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {qtyProgressedThisOrder.map((qtyProgressed) => (
            <DetailsTableRowQtyProgressed
              highestQtyProgressed={highestQtyProgressed}
              qtyProgressed={qtyProgressed}
            />
          ))}
        </TableBody>
      </Table>
    </Stack>
  );
}

export default DetailsTableQtyProgressed;
