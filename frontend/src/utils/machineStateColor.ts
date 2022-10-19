export const machineStateColor = (state: number) => {
  switch (state.toString()) {
    case "3":
      return "#4caf50";

    case "2":
      return "#ffeb3b";

    default:
      return "#d50000";
  }
};
