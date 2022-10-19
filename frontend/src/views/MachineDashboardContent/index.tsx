import { Box, Stack, Typography } from "@mui/material";
import * as React from "react";

import { useAppDispatch } from "../../hooks";
import {
  fetchMachines,
  useFetchMachines,
} from "../../hooks/services/useMachines";
import { MachineType } from "../../models";
import MachineCard from "./MachineCard";

function MachineDashboardContent() {
  const dispatch = useAppDispatch();
  const { machines, error: machineError } = useFetchMachines(dispatch);
  React.useEffect(() => {
    if (machineError !== null) {
      fetchMachines(dispatch);
    }
  }, [machineError]);

  const [fetchedMachines, setFetchedMachines] = React.useState<MachineType[]>(
    []
  );

  React.useEffect(() => {
    setFetchedMachines(machines);
  }, [machines, machines.length]);

  return (
    <Stack direction="column">
      <Typography color="textPrimary" sx={{ fontWeight: 800 }} variant="h4">
        DASHBOARD MACCHINE
      </Typography>
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 1,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {machineError ||
          fetchedMachines.map((machine) => (
            <MachineCard key={machine.COD_MACCHINA} machine={machine} />
          ))}
      </Box>
    </Stack>
  );
}

export default MachineDashboardContent;
