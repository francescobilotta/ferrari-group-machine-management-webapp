import Brightness1Icon from "@mui/icons-material/Brightness1";
import { Stack } from "@mui/material";
import React from "react";

type Props = {
  machineState: number;
};

function StopLight({ machineState }: Props) {
  const element = (array: any) => {
    return (
      <Stack direction="row">
        <Brightness1Icon sx={{ color: array[0], fontSize: "30px" }} />
        <Brightness1Icon sx={{ color: array[1], fontSize: "30px" }} />
        <Brightness1Icon sx={{ color: array[2], fontSize: "30px" }} />
      </Stack>
    );
  };

  switch (machineState.toString()) {
    case "3":
      return element(["#757575", "#757575", "#4caf50"]);

    case "2":
      return element(["#757575", "#ffeb3b", "#757575"]);

    default:
      return element(["#d50000", "#757575", "#757575"]);
  }
}

export default StopLight;
