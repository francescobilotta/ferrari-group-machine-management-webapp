import moment from "moment";

import { updateProgress } from "../../hooks/services/useProgresses";
import { OpeningType, ProgressType, StopType } from "../../models";

export function isStopStartAcceptable(
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
    enqueueSnackbar("C'è già un avanzamento in corso.", {
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
    const progressUpdate = {
      data: openProgress[0].data,
      datacreazione: openProgress[0].datacreazione,
      disabilitato: openProgress[0].disabilitato,
      fineavanzamento: moment().format("YYYY-MM-DD HH:mm:ss"),
      id: openProgress[0].id,
      inizioavanzamento: openProgress[0].inizioavanzamento,
      opsid: openProgress[0].opsid,
    };
    updateProgress(dispatch, progressUpdate);
  }

  return true;
}
