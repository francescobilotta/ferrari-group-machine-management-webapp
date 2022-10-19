import moment from "moment";

import { updateOpening } from "../../hooks/services/useOpenings";
import { OpeningType } from "../../models";

export function updateOpeningIfNeeded(
  dispatch: any,
  enqueueSnackbar: any,
  openings: OpeningType[],
  machine: string
) {
  const isDuringOpening = openings.find(
    (opening) =>
      opening.data === moment().format("YYYY-MM-DD") &&
      opening.macchina === machine
  );
  if (!isDuringOpening) {
    enqueueSnackbar("Oggi non è prevista una giornata di lavoro.", {
      variant: "error",
    });
    return false;
  }

  if (isDuringOpening.inizioeffettivo === "0000-00-00 00:00:00") {
    const now = moment();
    const plannedStart = moment(
      isDuringOpening.iniziopianificato,
      "YYYY-MM-DD HH:mm:ss"
    );

    const openingUpdate = {
      data: isDuringOpening.data,
      datacreazione: isDuringOpening.datacreazione,
      disabilitato: isDuringOpening.disabilitato,
      fineeffettiva: isDuringOpening.fineeffettiva,
      finepianificata: isDuringOpening.finepianificata,
      id: isDuringOpening.id,
      inizioeffettivo: now.format("YYYY-MM-DD HH:mm:ss"),
      iniziopianificato: now.isBefore(plannedStart)
        ? now.format("YYYY-MM-DD HH:mm:ss")
        : isDuringOpening.iniziopianificato,
      macchina: isDuringOpening.macchina,
      modificato: now.isBefore(plannedStart) ? 1 : 0,
    };
    updateOpening(dispatch, openingUpdate);
  }
  return true;
}
