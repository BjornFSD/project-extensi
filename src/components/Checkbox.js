import React from "react";
import { FormControl, RadioGroup, FormLabel } from "@material-ui/core";
import { Field } from "formik";
import styled, { css } from "styled-components";
import { Box } from "@mui/system";

const RadioGroupStyled = styled(RadioGroup)`
  ${() => css`
    padding: 10px 10px 10px 0;
  `}
`;

const CheckboxWrapper = ({
  children,
  name,
  legend,
  checkBoxListArray,
  ...otherProps
}) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{legend}</FormLabel>
      <RadioGroupStyled
        aria-label="gender"
        name="controlled-radio-buttons-group"
        defaultValue=""
      >
        <Box>
          <Field type="radio" label="male" value="male" name="picked" />
          Male
        </Box>
        <Box>
          <Field type="radio" label="female" value="female" name="picked" />
          Female
        </Box>
      </RadioGroupStyled>
    </FormControl>
  );
};

export default CheckboxWrapper;
