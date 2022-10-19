import { Box, Link, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { MachineType } from "../../models";
import { machineStateColor } from "../../utils";

type IProps = {
  machine: MachineType;
};

function MachineCard({ machine }: IProps) {
  return (
    <Link
      component={RouterLink}
      sx={{ textDecoration: "none" }}
      to={`${machine.COD_MACCHINA}`}
    >
      <Box
        sx={{
          alignItems: "center",
          bgcolor: machineStateColor(machine.PRIORITA),
          borderRadius: "15%",
          display: "flex",
          justifyContent: "center",
          m: 5,
          minHeight: 200,
          minWidth: 200,
        }}
      >
        <Typography sx={{ color: "#fff", fontWeight: 800 }} variant="h3">
          {machine.COD_MACCHINA}
        </Typography>
      </Box>
    </Link>
  );
}

export default MachineCard;
