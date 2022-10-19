import * as Moment from "moment";
import { extendMoment } from "moment-range";

import { OpeningType } from "../../models";

const moment = extendMoment(Moment);

export function isOpeningCreationAcceptable(
  newOpening: OpeningType,
  openings: OpeningType[]
) {
  const machine = newOpening.macchina;
  const startHour = moment(newOpening.iniziopianificato, "YYYY-MM-DD HH:mm:ss");
  const endHour = moment(newOpening.finepianificata, "YYYY-MM-DD HH:mm:ss");

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
    return "La fine deve essere maggiore dell'inizio.";
  }

  const overlappedDate = openings.filter(
    (opening) =>
      opening.macchina === machine &&
      opening.data ===
        moment(startHour, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")
  );
  if (overlappedDate.length > 0) {
    return "Macchina ha già apertura in questa data.";
  }

  const isDifferenceLessThan24Hours = (
    start: moment.Moment,
    end: moment.Moment
  ) => {
    if (Math.abs(moment.duration(start.diff(end)).asMinutes()) <= 1440) {
      return true;
    }
    return false;
  };
  if (!isDifferenceLessThan24Hours(startHour, endHour)) {
    return "Differenza maggiore di 24 ore.";
  }

  const doesOverlapOpening = openings.filter((opening) => {
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
    return "Si sovrappone a apertura.";
  }

  return true;
}
