import * as Moment from "moment";
import { extendMoment } from "moment-range";

import { OpeningType, ProgressType, StopType } from "../../models";

const moment = extendMoment(Moment);

export function isProgressUpdateAcceptable(
  enqueueSnackbar: any,
  openings: OpeningType[],
  progresses: ProgressType[],
  stops: StopType[],
  id: number,
  opsid: number,
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

  const isProgressDuringOpening = openings.find(
    (opening) => opening.data === startDate.format("YYYY-MM-DD")
  );
  if (!isProgressDuringOpening) {
    enqueueSnackbar("Il fermo non è in una giornata di lavoro.", {
      variant: "error",
    });
    return false;
  }

  const progressesShallowCopy = progresses.slice();
  progressesShallowCopy.splice(
    progresses.map((progress) => progress.id).indexOf(id),
    1
  );
  const doesOverlapProgress = progressesShallowCopy.filter(
    (progressElement) => {
      if (progressElement.opsid === opsid) {
        const range1 = moment.range(startDate, endDate);
        const range2 =
          progressElement.fineavanzamento !== "0000-00-00 00:00:00"
            ? moment.range(
                moment(
                  progressElement.inizioavanzamento,
                  "YYYY-MM-DD HH:mm:ss"
                ),
                moment(progressElement.fineavanzamento, "YYYY-MM-DD HH:mm:ss")
              )
            : moment.range(
                moment(
                  progressElement.inizioavanzamento,
                  "YYYY-MM-DD HH:mm:ss"
                ),
                moment()
              );
        return range1.overlaps(range2);
      }
      return false;
    }
  );
  if (doesOverlapProgress.length > 0) {
    enqueueSnackbar("Si sovrappone a un'altro avanzamento.", {
      variant: "error",
    });
    return false;
  }

  const doesOverlapStop = stops.filter((stopElement) => {
    const range1 = moment.range(startDate, endDate);
    const range2 =
      stopElement.finefermo !== "0000-00-00 00:00:00"
        ? moment.range(
            moment(stopElement.iniziofermo, "YYYY-MM-DD HH:mm:ss"),
            moment(stopElement.finefermo, "YYYY-MM-DD HH:mm:ss")
          )
        : moment.range(
            moment(stopElement.iniziofermo, "YYYY-MM-DD HH:mm:ss"),
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
