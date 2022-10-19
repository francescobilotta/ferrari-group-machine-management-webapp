import * as Moment from "moment";
import { extendMoment } from "moment-range";

import { OpeningType, StopType } from "../../models";

const moment = extendMoment(Moment);

export function isStopUpdateAcceptable(
  enqueueSnackbar: any,
  openings: OpeningType[],
  stops: StopType[],
  id: number,
  machine: string,
  startDate: moment.Moment,
  endDate: moment.Moment
) {
  const isEndAfterStart = (start: moment.Moment, end: moment.Moment) => {
    if (
      start.format("YYYY-MM-DD HH:mm:ss") !==
        end.format("YYYY-MM-DD HH:mm:ss") &&
      start.isBefore(end)
    ) {
      return true;
    }
    return false;
  };
  if (!isEndAfterStart(startDate, endDate)) {
    enqueueSnackbar(
      "La data di fine deve essere maggiore della data d'inizio.",
      {
        variant: "error",
      }
    );
    return false;
  }

  const isInSameDay = (start: moment.Moment, end: moment.Moment) => {
    if (start.format("YYYY-MM-DD") === end.format("YYYY-MM-DD")) {
      return true;
    }
    return false;
  };
  if (!isInSameDay(startDate, endDate)) {
    enqueueSnackbar("Le due date sono in giorni diversi.", {
      variant: "error",
    });
    return false;
  }

  const isStopDuringOpening = openings.find(
    (opening) =>
      opening.macchina === machine &&
      opening.data === startDate.format("YYYY-MM-DD")
  );

  if (!isStopDuringOpening) {
    enqueueSnackbar("Il fermo non è in una giornata di lavoro.", {
      variant: "error",
    });
    return false;
  }

  const stopsShallowCopy = stops.slice();
  stopsShallowCopy.splice(stops.map((stop) => stop.id).indexOf(id), 1);
  const doesOverlapStop = stopsShallowCopy.filter((stop) => {
    const range1 = moment.range(startDate, endDate);
    const range2 =
      stop.finefermo !== "0000-00-00 00:00:00"
        ? moment.range(
            moment(stop.iniziofermo, "YYYY-MM-DD HH:mm:ss"),
            moment(stop.finefermo, "YYYY-MM-DD HH:mm:ss")
          )
        : moment.range(
            moment(stop.iniziofermo, "YYYY-MM-DD HH:mm:ss"),
            moment()
          );
    return range1.overlaps(range2);
  });
  if (doesOverlapStop.length > 0) {
    enqueueSnackbar("Si sovrappone a un'altro fermo.", {
      variant: "error",
    });
    return false;
  }

  return true;
}
