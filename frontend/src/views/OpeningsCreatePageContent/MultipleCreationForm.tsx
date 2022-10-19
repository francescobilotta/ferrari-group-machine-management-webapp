/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/dot-notation */
import moment, { Moment } from "moment";
import React from "react";
import { read, utils } from "xlsx";

import { ExcelDataRowType, OpeningType } from "../../models";
import { excelDateToJsDate } from "../../utils";

function isValidDate(d: Date) {
  if (Object.prototype.toString.call(d) === "[object Date]") {
    // it is a date
    if (Number.isNaN(d)) {
      // d.getTime() or d.valueOf() will also work
      // date object is not valid
      return false;
    }
    // date object is valid
    return true;
  }
  return false;
  // not a date object
}

function MultipleCreationForm({
  handleNewOpenings,
  handleSubmit,
  openings,
}: {
  handleNewOpenings: (
    newEntries: {
      date: Moment;
      endHour: Moment;
      machine: string;
      startHour: Moment;
      isValid: string;
    }[]
  ) => void;
  handleSubmit: (
    machineElement: string,
    dateElement: moment.Moment | null,
    startHourElement: moment.Moment | null,
    endHourElement: moment.Moment | null,
    openingsArray?: OpeningType[]
  ) => string | boolean;
  openings: OpeningType[];
}) {
  const handleImport = ($event: any) => {
    const { files } = $event.target;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]) as any[];
          const rawData: ExcelDataRowType[] = rows.filter((row) => {
            return (
              typeof row["Macchina"] === "string" &&
              typeof row["Data"] === "number" &&
              isValidDate(excelDateToJsDate(row["Data"])) &&
              typeof row["Inizio Pianificato"] === "number" &&
              isValidDate(excelDateToJsDate(row["Inizio Pianificato"])) &&
              typeof row["Fine Pianificata"] === "number" &&
              isValidDate(excelDateToJsDate(row["Fine Pianificata"])) &&
              typeof row["Fine Giorno Successivo"] === "boolean"
            );
          });
          const preparedData = rawData.map((data) => {
            const rawDate = excelDateToJsDate(data.Data);
            const rawStartHour = excelDateToJsDate(data["Inizio Pianificato"]);
            const rawEndHour = excelDateToJsDate(data["Fine Pianificata"]);
            const finishedNextDay = data["Fine Giorno Successivo"];

            const date = moment(rawDate);
            const startHour = moment(
              `${date.format(
                "YYYY-MM-DD"
              )} ${rawStartHour.getHours()}:${rawStartHour.getMinutes()}:${rawStartHour.getSeconds()}`,
              "YYYY-MM-DD HH:mm:ss"
            );
            const endHour = finishedNextDay
              ? moment(
                  `${date
                    .clone()
                    .add(1, "days")
                    .format(
                      "YYYY-MM-DD"
                    )} ${rawEndHour.getHours()}:${rawEndHour.getMinutes()}:${rawEndHour.getSeconds()}`,
                  "YYYY-MM-DD HH:mm:ss"
                )
              : moment(
                  `${date.format(
                    "YYYY-MM-DD"
                  )} ${rawEndHour.getHours()}:${rawEndHour.getMinutes()}:${rawEndHour.getSeconds()}`,
                  "YYYY-MM-DD HH:mm:ss"
                );

            return {
              date: date,
              endHour: endHour,
              machine: data.Macchina,
              startHour: startHour,
            };
          });

          let openingsCreated = [...openings];
          const newOpenings = [] as {
            date: Moment;
            endHour: Moment;
            machine: string;
            startHour: Moment;
            isValid: string;
          }[];

          preparedData.forEach((opening) => {
            const openingCreation = handleSubmit(
              opening.machine,
              opening.date,
              opening.startHour,
              opening.endHour,
              openingsCreated
            );
            if (openingCreation === true) {
              newOpenings.push({
                date: opening.date,
                endHour: opening.endHour,
                isValid: "Valido",
                machine: opening.machine,
                startHour: opening.startHour,
              });
              openingsCreated = [
                ...openingsCreated,
                {
                  data: moment(opening.date).format("YYYY-MM-DD"),
                  datacreazione: moment().format("YYYY-MM-DD HH:mm:ss"),
                  disabilitato: 0,
                  fineeffettiva: "0000-00-00 00:00:00",
                  finepianificata: moment(opening.endHour).format(
                    "YYYY-MM-DD HH:mm:ss"
                  ),
                  inizioeffettivo: "0000-00-00 00:00:00",
                  iniziopianificato: moment(opening.startHour).format(
                    "YYYY-MM-DD HH:mm:ss"
                  ),
                  macchina: opening.machine,
                  modificato: 0,
                },
              ];
            } else if (typeof openingCreation === "string") {
              newOpenings.push({
                date: opening.date,
                endHour: opening.endHour,
                isValid: openingCreation,
                machine: opening.machine,
                startHour: opening.startHour,
              });
            }
          });

          handleNewOpenings(newOpenings);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="row mb-2 mt-5">
      <div className="col-sm-6 offset-3">
        <div className="row">
          <div className="col-md-6">
            <div className="input-group">
              <div className="custom-file">
                <input
                  required
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  className="custom-file-input"
                  id="inputGroupFile"
                  name="file"
                  type="file"
                  onChange={handleImport}
                />
                Choose file
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultipleCreationForm;
