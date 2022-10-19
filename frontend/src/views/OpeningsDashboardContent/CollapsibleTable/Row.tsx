import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { IconButton, TableCell, TableRow } from "@mui/material";
import moment from "moment";
import * as React from "react";

import { OpeningType, ProgressType, StopType } from "../../../models";
import DetailsCollapsible from "./DetailsCollapsible";
import ModifyCollapsible from "./ModifyCollapsible";

type IProps = {
  opening: OpeningType;
  openings: OpeningType[];
  progresses: ProgressType[];
  stops: StopType[];
  handleDelete: (openingToDelete: any) => void;
};

function Row({ opening, openings, progresses, stops, handleDelete }: IProps) {
  const [openDetails, setOpenDetails] = React.useState(false);
  const [openModify, setOpenModify] = React.useState(false);

  const stopsThisOpening = stops.filter(
    (stop) => opening.data === stop.data && opening.macchina === stop.macchina
  );

  const progressesThisDate = progresses.filter(
    (progress) => progress.data === opening.data
  );

  const [canBeDeleted, setCanBeDeleted] = React.useState(
    !!(
      stopsThisOpening.length === 0 &&
      progressesThisDate.length === 0 &&
      opening.inizioeffettivo === "0000-00-00 00:00:00" &&
      opening.fineeffettiva === "0000-00-00 00:00:00"
    )
  );
  React.useEffect(() => {
    if (
      stopsThisOpening.length === 0 &&
      progressesThisDate.length === 0 &&
      opening.inizioeffettivo === "0000-00-00 00:00:00" &&
      opening.fineeffettiva === "0000-00-00 00:00:00"
    ) {
      setCanBeDeleted(true);
    }
  }, [stops, progresses, opening.id]);

  return (
    <>
      <TableRow key={opening.id} sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => (!openDetails ? setOpenModify(!openModify) : null)}
          >
            {openModify ? <KeyboardArrowUpIcon /> : <EditIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => (!openModify ? setOpenDetails(!openDetails) : null)}
          >
            {openDetails ? <KeyboardArrowUpIcon /> : <VisibilityIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{opening.macchina}</TableCell>
        <TableCell>
          {moment(opening.data, "YYYY-MM-DD").format("DD/MM/YYYY")}
        </TableCell>
        <TableCell>
          {moment(opening.iniziopianificato, "YYYY-MM-DD HH:mm:ss").format(
            "DD/MM/YYYY HH:mm:ss"
          )}
        </TableCell>
        <TableCell>
          {opening.inizioeffettivo !== "0000-00-00 00:00:00"
            ? moment(opening.inizioeffettivo, "YYYY-MM-DD HH:mm:ss").format(
                "DD/MM/YYYY HH:mm:ss"
              )
            : opening.inizioeffettivo}
        </TableCell>
        <TableCell>
          {moment(opening.finepianificata, "YYYY-MM-DD HH:mm:ss").format(
            "DD/MM/YYYY HH:mm:ss"
          )}
        </TableCell>
        <TableCell>
          {opening.inizioeffettivo !== "0000-00-00 00:00:00"
            ? moment(opening.fineeffettiva, "YYYY-MM-DD HH:mm:ss").format(
                "DD/MM/YYYY HH:mm:ss"
              )
            : opening.inizioeffettivo}
        </TableCell>
        <TableCell>{opening.modificato}</TableCell>
        <TableCell>
          {moment(opening.datacreazione, "YYYY-MM-DD HH:mm:ss").format(
            "DD/MM/YYYY HH:mm:ss"
          )}
        </TableCell>
        <TableCell>
          {canBeDeleted ? (
            <IconButton
              aria-label="delete row"
              size="small"
              onClick={() => {
                if (opening.id) {
                  if (window.confirm("Sicuro di voler cancellare?") === true) {
                    handleDelete(opening.id);
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
      <ModifyCollapsible
        open={openModify}
        opening={opening}
        openings={openings}
      />
      <DetailsCollapsible
        open={openDetails}
        progressesThisDate={progressesThisDate}
        stopsThisOpening={stopsThisOpening}
      />
    </>
  );
}

export default Row;
