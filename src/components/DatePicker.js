import React from "react";
import { useField } from "formik";
import { TextField } from "@mui/material";

const DatePickerField = ({ name, ...otherProps }) => {
  const [field] = useField(name);
  const configTextfield = {
    ...field,
    ...otherProps,
    type: "date",
    fullWidth: true,
    variant: "outlined",
    InputLabelProps: {
      shrink: true,
    },
  };

  return <TextField {...configTextfield} />;
};

export default DatePickerField;
