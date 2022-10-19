import moment from "moment";

import { updateStop } from "../../hooks/services/useStops";
import { OpeningType, ProgressType, StopType } from "../../models";

export function isProgressStartAcceptable(
  dispatch: any,
  enqueueSnackbar: any,
  openings: OpeningType[],
  stops: StopType[],
  progresses: ProgressType[],
  opsid: number,
  machine: string
) {
  const isDuringOpening = openings.find(
    (opening) => opening.data === moment().format("YYYY-MM-DD")
  );
  if (!isDuringOpening) {
    enqueueSnackbar("Oggi non è prevista una giornata di lavoro.", {
      variant: "error",
    });
    return false;
  }

  const openProgress = progresses.filter(
    (progress) =>
      progress.fineavanzamento === "0000-00-00 00:00:00" &&
      progress.opsid === opsid
  );

  if (openProgress.length > 1) {
    enqueueSnackbar(
      "C'è un problema, ci sono più aperture aperte, che succede?",
      {
        variant: "error",
      }
    );
    return false;
  }

  if (openProgress.length === 1) {
    enqueueSnackbar("C'è già un avanzamento in corso", {
      variant: "error",
    });
    return false;
  }

  const openStop = stops.filter(
    (stop) =>
      stop.finefermo === "0000-00-00 00:00:00" && stop.macchina === machine
  );

  if (openStop.length > 1) {
    enqueueSnackbar("C'è un problema, ci sono più fermi aperti, che succede?", {
      variant: "error",
    });
    return false;
  }

  if (openStop.length === 1) {
    const stopUpdate = {
      causale: openStop[0].causale,
      data: openStop[0].data,
      datacreazione: openStop[0].datacreazione,
      disabilitato: openStop[0].disabilitato,
      finefermo: moment().format("YYYY-MM-DD HH:mm:ss"),
      id: openStop[0].id,
      iniziofermo: openStop[0].iniziofermo,
      macchina: openStop[0].macchina,
    };
    updateStop(dispatch, stopUpdate);
  }

  return true;
}
