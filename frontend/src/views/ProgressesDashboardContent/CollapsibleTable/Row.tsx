import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import { IconButton, TableCell, TableRow } from "@mui/material";
import moment from "moment";
import * as React from "react";

import { OpeningType, ProgressType, StopType } from "../../../models";
import ModifyCollapsible from "./ModifyCollapsible";

type IProps = {
  progress: ProgressType;
  handleDelete: (progressToDelete: any) => void;
  openings: OpeningType[];
  progresses: ProgressType[];
  stops: StopType[];
};

function Row({ progress, handleDelete, progresses, stops, openings }: IProps) {
  const [openModify, setOpenModify] = React.useState(false);

  return (
    <>
      <TableRow key={progress.id} sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          {progress.fineavanzamento !== "0000-00-00 00:00:00" ? (
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
        <TableCell>{progress.opsid}</TableCell>
        <TableCell>
          {moment(progress.data, "YYYY-MM-DD ").format("DD/MM/YYYY ")}
        </TableCell>
        <TableCell>
          {moment(progress.inizioavanzamento, "YYYY-MM-DD HH:mm:ss").format(
            "DD/MM/YYYY HH:mm:ss"
          )}
        </TableCell>
        <TableCell>
          {progress.fineavanzamento !== "0000-00-00 00:00:00"
            ? moment(progress.fineavanzamento, "YYYY-MM-DD HH:mm:ss").format(
                "DD/MM/YYYY HH:mm:ss"
              )
            : progress.fineavanzamento}
        </TableCell>
        <TableCell>
          {moment(progress.datacreazione, "YYYY-MM-DD HH:mm:ss").format(
            "DD/MM/YYYY HH:mm:ss"
          )}
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="delete row"
            size="small"
            onClick={() => {
              if (progress.id) {
                if (window.confirm("Sicuro di voler cancellare?") === true) {
                  handleDelete(progress.id);
                }
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      {progress.fineavanzamento !== "0000-00-00 00:00:00" ? (
        <ModifyCollapsible
          open={openModify}
          openings={openings}
          progress={progress}
          progresses={progresses}
          stops={stops}
        />
      ) : undefined}
    </>
  );
}

export default Row;
