export const booleanToggle = (
  boolean: boolean,
  setBoolean: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setBoolean(!boolean);
};
