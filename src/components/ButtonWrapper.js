import React from "react";
import { Button } from "@mui/material";
import { useFormikContext } from "formik";

const ButtonWrapper = ({ children, ...otherProps }) => {
  const { submitForm } = useFormikContext();
  const handleSubmit = () => {
    submitForm();
  };

  return (
    <Button onClick={handleSubmit} variant="contained">
      {children}
    </Button>
  );
};

export default ButtonWrapper;
