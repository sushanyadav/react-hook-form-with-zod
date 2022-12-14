// These functions are used when we want to set the default initial value to undefined

// In the scenario where there are no value (empty string), the input will return NaN.
// Function transformNumberOnChange will convert the value to undefined instead of NaN
export const transformNumberOnChange = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const numberValue = event.target.valueAsNumber;
  return isNaN(numberValue) ? undefined : numberValue;
};

// This function is used to transform NaN and undefined value to empty value ('')
// When we press on reset, the value will be set to undefined and without this function, it will show NaN instead of empty value ('')
export const transformNumberValue = (value: number) => {
  return isNaN(value) ? '' : value;
};
