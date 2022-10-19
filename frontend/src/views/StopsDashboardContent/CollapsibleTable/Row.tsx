import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import { IconButton, TableCell, TableRow } from "@mui/material";
import moment from "moment";
import * as React from "react";

import {
  MachineType,
  OpeningType,
  ReasonType,
  StopType,
} from "../../../models";
import ModifyCollapsible from "./ModifyCollapsible";

type IProps = {
  stop: StopType;
  handleDelete: (stopToDelete: any) => void;
  openings: OpeningType[];
  stops: StopType[];
  reasons: ReasonType[];
  machines: MachineType[];
};

function Row({
  stop,
  handleDelete,
  openings,
  stops,
  reasons,
  machines,
}: IProps) {
  const [openModify, setOpenModify] = React.useState(false);

  return (
    <>
      <TableRow key={stop.id} sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          {stop.finefermo !== "0000-00-00 00:00:00" ? (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpenModify(!openModify)}
            >
              {openModify ? <KeyboardArrowUpIcon /> : <EditIcon />}
            </IconButton>
          ) : (
            "Non modificabile"
          )}
        </TableCell>
        <TableCell>{stop.macchina}</TableCell>
        <TableCell>
          {moment(stop.data, "YYYY-MM-DD").format("DD/MM/YYYY")}
        </TableCell>
        <TableCell>
          {moment(stop.iniziofermo, "YYYY-MM-DD HH:mm:ss").format(
            "DD/MM/YYYY HH:mm:ss"
          )}
        </TableCell>
        <TableCell>
          {stop.finefermo !== "0000-00-00 00:00:00"
            ? moment(stop.finefermo, "YYYY-MM-DD HH:mm:ss").format(
                "DD/MM/YYYY HH:mm:ss"
              )
            : stop.finefermo}
        </TableCell>
        <TableCell>{stop.causale}</TableCell>
        <TableCell>
          {moment(stop.datacreazione, "YYYY-MM-DD HH:mm:ss").format(
            "DD/MM/YYYY HH:mm:ss"
          )}
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="delete row"
            size="small"
            onClick={() => {
              if (stop.id) {
                if (window.confirm("Sicuro di voler cancellare?") === true) {
                  handleDelete(stop.id);
                }
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      {stop.finefermo !== "0000-00-00 00:00:00" ? (
        <ModifyCollapsible
          machines={machines}
          open={openModify}
          openings={openings}
          reasons={reasons}
          stop={stop}
          stops={stops}
        />
      ) : undefined}
    </>
  );
}

export default Row;
