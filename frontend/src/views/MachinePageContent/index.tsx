import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useParams } from "react-router-dom";

import StopLight from "../../components/StopLight";
import { useAppDispatch } from "../../hooks";
import {
  fetchMachines,
  useFetchMachines,
} from "../../hooks/services/useMachines";
import {
  fetchOpenings,
  useFetchOpenings,
} from "../../hooks/services/useOpenings";
import { useFetchOrders } from "../../hooks/services/useOrders";
import {
  createProgress,
  fetchProgresses,
  useFetchProgresses,
} from "../../hooks/services/useProgresses";
import {
  fetchQtyDiscarded,
  useFetchQtyDiscarded,
} from "../../hooks/services/useQtyDiscarded";
import {
  fetchQtyProgressed,
  useFetchQtyProgressed,
} from "../../hooks/services/useQtyProgressed";
import { fetchReasons, useFetchReasons } from "../../hooks/services/useReasons";
import {
  createStop,
  fetchStops,
  useFetchStops,
} from "../../hooks/services/useStops";
import {
  MachineType,
  OrderType,
  ProgressType,
  ReasonType,
  StopType,
} from "../../models";
import {
  autofixMachineState,
  isProgressStartAcceptable,
  isStopStartAcceptable,
} from "../../utils";
import { updateOpeningIfNeeded } from "../../utils/logic/updateOpeningIfNeeded";
import MissingQtyDialog from "./MissingQtyDialog";
import Row from "./Row";

function MachinePageContent() {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { machineCode } = useParams();

  const { machines, error: machineError } = useFetchMachines(dispatch);
  const { openings, error: openingError } = useFetchOpenings(dispatch);
  const { progresses, error: progressError } = useFetchProgresses(dispatch);
  const { stops, error: stopError } = useFetchStops(dispatch);
  const { reasons, error: reasonError } = useFetchReasons(dispatch);
  const { qtyProgressed, error: qtyProgressedError } =
    useFetchQtyProgressed(dispatch);
  const { qtyDiscarded, error: qtyDiscardedError } =
    useFetchQtyDiscarded(dispatch);
  const { orders, error: orderError } = useFetchOrders(dispatch);
  React.useEffect(() => {
    if (machineError !== null) {
      fetchMachines(dispatch);
    }
    if (openingError !== null) {
      fetchOpenings(dispatch);
    }
    if (progressError !== null) {
      fetchProgresses(dispatch);
    }
    if (stopError !== null) {
      fetchStops(dispatch);
    }
    if (reasonError !== null) {
      fetchReasons(dispatch);
    }
    if (qtyProgressedError !== null) {
      fetchQtyProgressed(dispatch);
    }
    if (qtyDiscardedError !== null) {
      fetchQtyDiscarded(dispatch);
    }
  }, [
    machineError,
    openingError,
    progressError,
    stopError,
    reasonError,
    qtyProgressedError,
    qtyDiscardedError,
  ]);
  const [reason, setReason] = React.useState<number>(0);
  React.useEffect(() => {
    if (reasons && reasons.length > 0) {
      setReason(
        reasons.find((causale: ReasonType) => causale.tipo === "fermo")!.id
      );
    }
  }, [reasons.length]);

  const [openMissingQtyDialog, setOpenMissingQtyDialog] = React.useState(false);
  const [openStopCreationDialog, setOpenStopCreationDialog] =
    React.useState(false);

  const [thisMachineOrders, setThisMachineOrders] = React.useState<OrderType[]>(
    []
  );
  React.useEffect(() => {
    setThisMachineOrders(orders.filter((order) => order.cdl === machineCode));
  }, [orders]);

  const [currentOrder, setCurrentOrder] = React.useState<OrderType | undefined>(
    undefined
  );
  React.useEffect(() => {
    setCurrentOrder(
      thisMachineOrders.find(
        (order) =>
          order.seq ===
          thisMachineOrders.reduce((prev, curr) => {
            return prev.seq < curr.seq ? prev : curr;
          }).seq
      )
    );
  }, [thisMachineOrders]);

  const [daysMissingQty, setDaysMissingQty] = React.useState<ProgressType[]>(
    []
  );
  React.useEffect(() => {
    if (currentOrder !== undefined) {
      setDaysMissingQty(
        progresses.filter(
          (progress) =>
            progress.opsid === currentOrder.id &&
            progress.data !== moment().format("YYYY-MM-DD") &&
            qtyProgressed.find((qty) => qty.data === progress.data) ===
              undefined
        )
      );
    } else {
      setDaysMissingQty([]);
    }
  }, [progresses, currentOrder, qtyProgressed.length]);

  const [retrievedMachine, setRetrievedMachine] = React.useState<
    MachineType | undefined
  >(undefined);
  React.useEffect(() => {
    if (machines && machines.length > 0) {
      setRetrievedMachine(
        machines.filter((machine) => machine.COD_MACCHINA === machineCode)[0]
      );
    } else {
      setRetrievedMachine(undefined);
    }
  }, [...machines.map((machine) => machine.PRIORITA), machines.length]);

  const handleStartProgress = () => {
    if (daysMissingQty.length > 0) {
      setOpenMissingQtyDialog(true);
      return;
    }
    if (
      currentOrder !== undefined &&
      retrievedMachine !== undefined &&
      progresses &&
      stops &&
      openings
    ) {
      if (
        isProgressStartAcceptable(
          dispatch,
          enqueueSnackbar,
          openings,
          stops,
          progresses,
          currentOrder.id,
          retrievedMachine.COD_MACCHINA
        )
      ) {
        if (
          updateOpeningIfNeeded(
            dispatch,
            enqueueSnackbar,
            openings,
            retrievedMachine.COD_MACCHINA
          )
        ) {
          const newProgress = {
            data: moment().format("YYYY-MM-DD"),
            datacreazione: moment().format("YYYY-MM-DD HH:mm:ss"),
            disabilitato: 0,
            fineavanzamento: "0000-00-00 00:00:00",
            inizioavanzamento: moment().format("YYYY-MM-DD HH:mm:ss"),
            opsid: currentOrder.id,
          };
          createProgress(dispatch, newProgress);
          fetchProgresses(dispatch);
        }
      }
    }
  };

  const handleStartStop = () => {
    if (daysMissingQty.length > 0) {
      setOpenMissingQtyDialog(true);
      return;
    }
    if (
      reason !== undefined &&
      currentOrder !== undefined &&
      retrievedMachine !== undefined &&
      progresses &&
      stops &&
      openings
    ) {
      if (
        isStopStartAcceptable(
          dispatch,
          enqueueSnackbar,
          openings,
          stops,
          progresses,
          currentOrder.id,
          retrievedMachine.COD_MACCHINA
        )
      ) {
        if (
          updateOpeningIfNeeded(
            dispatch,
            enqueueSnackbar,
            openings,
            retrievedMachine.COD_MACCHINA
          )
        ) {
          const newStop = {
            causale: reason,
            data: moment().format("YYYY-MM-DD"),
            datacreazione: moment().format("YYYY-MM-DD HH:mm:ss"),
            disabilitato: 0,
            finefermo: "0000-00-00 00:00:00",
            iniziofermo: moment().format("YYYY-MM-DD HH:mm:ss"),
            macchina: retrievedMachine.COD_MACCHINA,
          };
          createStop(dispatch, newStop);
          setOpenStopCreationDialog(false);
          fetchStops(dispatch);
        }
      }
    }
  };

  const [openProgress, setOpenProgress] = React.useState<ProgressType[]>([]);
  const [openStop, setOpenStop] = React.useState<StopType[]>([]);
  React.useEffect(() => {
    if (currentOrder !== undefined) {
      setOpenProgress(
        progresses.filter(
          (progress) =>
            progress.opsid === currentOrder.id &&
            progress.fineavanzamento === "0000-00-00 00:00:00"
        )
      );
    } else {
      setOpenProgress([]);
    }

    if (retrievedMachine !== undefined) {
      setOpenStop(
        stops.filter(
          (stop) =>
            stop.macchina === retrievedMachine.COD_MACCHINA &&
            stop.finefermo === "0000-00-00 00:00:00"
        )
      );
    } else {
      setOpenStop([]);
    }
  }, [progresses.length, stops.length]);

  React.useEffect(() => {
    if (retrievedMachine !== undefined) {
      autofixMachineState(dispatch, retrievedMachine, openProgress, openStop);
    }
  }, [retrievedMachine, openProgress.length, openStop.length]);

  React.useEffect(() => {
    if (daysMissingQty.length > 0) {
      setOpenMissingQtyDialog(true);
    } else {
      setOpenMissingQtyDialog(false);
    }
  }, [daysMissingQty.length]);

  return retrievedMachine ? (
    <Stack direction="column" sx={{ maxWidth: 860 }}>
      {machineError ||
        progressError ||
        stopError ||
        openingError ||
        reasonError ||
        qtyProgressedError ||
        qtyDiscardedError || (
          <>
            <Stack direction="row" m={1} p={1}>
              <Typography
                color="textPrimary"
                sx={{ fontWeight: 800 }}
                variant="h4"
              >
                MACCHINA {retrievedMachine.COD_MACCHINA}
              </Typography>
              {retrievedMachine !== undefined && (
                <StopLight machineState={retrievedMachine.PRIORITA} />
              )}
              {currentOrder && daysMissingQty && daysMissingQty.length > 0 && (
                <>
                  <Button
                    sx={{ fontWeight: 600, marginLeft: 3 }}
                    variant="contained"
                    onClick={() => setOpenMissingQtyDialog(true)}
                  >
                    Apri Popup Aggiornamento Quantità
                  </Button>
                  <MissingQtyDialog
                    currentOrder={currentOrder}
                    daysMissingQty={daysMissingQty}
                    dispatch={dispatch}
                    openMissingQtyDialog={openMissingQtyDialog}
                    setOpenMissingQtyDialog={setOpenMissingQtyDialog}
                    totalQty={currentOrder.qtaord}
                    highestQtyProgressed={
                      qtyProgressed.length > 0
                        ? Math.max(
                            ...qtyProgressed.map(
                              (element) => element.qtaavanzata
                            )
                          )
                        : 0
                    }
                    qtyDiscardedSum={
                      qtyDiscarded.length > 0
                        ? qtyDiscarded.reduce(
                            (previousValue, currentValue) =>
                              previousValue + currentValue.qtascartata,
                            0
                          )
                        : 0
                    }
                  />
                </>
              )}
            </Stack>
            <Paper sx={{ overflow: "auto" }}>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell />
                      <TableCell />
                      <TableCell />
                      <TableCell>Seq</TableCell>
                      <TableCell>Note</TableCell>
                      <TableCell>Macc</TableCell>
                      <TableCell>OPS</TableCell>
                      <TableCell>Data Richiesta</TableCell>
                      <TableCell>Codice</TableCell>
                      <TableCell>Descrizione</TableCell>
                      <TableCell>Qta Tot</TableCell>
                      <TableCell>Qta Avanz</TableCell>
                      <TableCell>Qta Scarti</TableCell>
                      <TableCell>Inizio Sched</TableCell>
                      <TableCell>Fine Sched</TableCell>
                      <TableCell>Turno</TableCell>
                      <TableCell>Setup</TableCell>
                      <TableCell>GG</TableCell>
                      <TableCell>Ore Macc</TableCell>
                      <TableCell>Cambio Fig</TableCell>
                      <TableCell>Mac</TableCell>
                      <TableCell>Ess</TableCell>
                      <TableCell>Scalda</TableCell>
                      <TableCell>MP</TableCell>
                      <TableCell>MPType</TableCell>
                      <TableCell>Peso MP</TableCell>
                      <TableCell>Col</TableCell>
                      <TableCell>ColType</TableCell>
                      <TableCell>Peso Col</TableCell>
                      <TableCell>Tipo Fermo</TableCell>
                      <TableCell>Ore Fermo</TableCell>
                      <TableCell>Alimst</TableCell>
                      <TableCell>Alimst</TableCell>
                      <TableCell>OPS Disassegna Macchina</TableCell>
                      {/* <a href='../OPSdisassegna_macch.php?eserc=${element.eserc}&tipo=${element.tipo}&numops=${element.numops}&idops=${element.idOPS}'>
                        <img src=${deleteIconPath} style="width: 29px; height: 25px;">
                    </a> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderError ||
                      (currentOrder &&
                        thisMachineOrders.map((order) => (
                          <Row
                            currentOrder={currentOrder}
                            handleStartProgress={handleStartProgress}
                            order={order}
                            qtyDiscarded={qtyDiscarded}
                            qtyProgressed={qtyProgressed}
                            reasons={reasons}
                            setOpenStopCreationDialog={
                              setOpenStopCreationDialog
                            }
                          />
                        )))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Dialog
                open={openStopCreationDialog}
                onClose={() => setOpenStopCreationDialog(false)}
              >
                <DialogTitle>Inizio fermo</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Per creare un fermo devi selezionare una causale.
                  </DialogContentText>
                  <Select
                    value={reason ? reason.toString() : "0"}
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
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpenStopCreationDialog(false)}>
                    Chiudi
                  </Button>
                  {reason ? (
                    <Button onClick={handleStartStop}>Crea fermo</Button>
                  ) : undefined}
                </DialogActions>
              </Dialog>
            </Paper>
          </>
        )}
    </Stack>
  ) : (
    <Stack direction="column">
      <Box m={1} p={1}>
        <Typography color="textPrimary" sx={{ fontWeight: 800 }} variant="h4">
          Macchina non trovata
        </Typography>
      </Box>
    </Stack>
  );
}

export default MachinePageContent;
