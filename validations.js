export const removeSpacesAndSpecialChars = (str) =>
  str.replace(/[^a-z0-9]/gi, "");

export const areCharsCorrectType = (str) => /[a-z]{1}\d{1,2}/i.test(str);

export const convertStrToCoords = (str) => {
  return { col: str.slice(0, 1), row: str.slice(1) };
};
