// @jerald
export const transformNumberOnChange = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const numberValue = event.target.valueAsNumber;
  return isNaN(numberValue) ? undefined : numberValue;
};

export const transformNumberValue = (value: number) => {
  return isNaN(value) ? '' : value;
};
