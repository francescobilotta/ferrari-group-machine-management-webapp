import * as Moment from "moment";
import { extendMoment } from "moment-range";

import { OpeningType } from "../../models";

const moment = extendMoment(Moment);

export function isOpeningUpdateAcceptable(
  enqueueSnackbar: any,
  openings: OpeningType[],
  previousOpening: OpeningType,
  machine: string,
  startHour: moment.Moment,
  endHour: moment.Moment
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
  if (!isEndAfterStart(startHour, endHour)) {
    enqueueSnackbar(
      "La data di fine deve essere maggiore della data d'inizio.",
      {
        variant: "error",
      }
    );
    return false;
  }

  const overlappedDate = openings.filter(
    (opening) =>
      opening.macchina === machine &&
      opening.data ===
        moment(startHour, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")
  );
  if (
    previousOpening.data !==
    moment(startHour, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")
  ) {
    if (overlappedDate.length > 0) {
      enqueueSnackbar("Questa macchina ha già un'apertura in questa data.", {
        variant: "error",
      });
      return false;
    }
  }

  const isDifferenceLessThan24Hours = (
    start: moment.Moment,
    end: moment.Moment
  ) => {
    if (moment.duration(start.diff(end)).asMinutes() <= 1440) {
      return true;
    }
    return false;
  };
  if (!isDifferenceLessThan24Hours(startHour, endHour)) {
    enqueueSnackbar("La differenza tra le due date è maggiore di 24 ore.", {
      variant: "error",
    });
    return false;
  }

  const openingsShallowCopy = openings.slice();
  openingsShallowCopy.splice(
    openings
      .map((opening) => opening.data)
      .indexOf(moment(startHour, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")),
    1
  );
  const doesOverlapOpening = openingsShallowCopy.filter((opening) => {
    if (opening.macchina === machine) {
      const range1 = moment.range(startHour, endHour);
      const range2 = moment.range(
        moment(opening.iniziopianificato, "YYYY-MM-DD HH:mm:ss"),
        moment(opening.finepianificata, "YYYY-MM-DD HH:mm:ss")
      );
      return range1.overlaps(range2);
    }
    return false;
  });
  if (doesOverlapOpening.length > 0) {
    enqueueSnackbar("Si sovrappone a un'altra apertura.", {
      variant: "error",
    });
    return false;
  }

  return true;
}
