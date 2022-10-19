import { TableCell, TableRow } from "@mui/material";
import moment from "moment";
import * as React from "react";

import { QtyProgressedType } from "../../../models";

function Row({ qty }: { qty: QtyProgressedType }) {
  return (
    <TableRow key={qty.id} sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell>{qty.opsid}</TableCell>
      <TableCell>
        {moment(qty.data, "YYYY-MM-DD").format("DD/MM/YYYY")}
      </TableCell>
      <TableCell>{qty.qtaavanzata}</TableCell>
      <TableCell>
        {moment(qty.datacreazione, "YYYY-MM-DD HH:mm:ss").format(
          "DD/MM/YYYY HH:mm:ss"
        )}
      </TableCell>
    </TableRow>
  );
}

export default Row;
