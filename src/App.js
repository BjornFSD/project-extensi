import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ValidationTextField from "./components/TextField";
import DatePickerField from "./components/DatePicker";
import CheckboxWrapper from "./components/Checkbox";
import Button from "./components/ButtonWrapper";

const useStyles = makeStyles(() => ({
  mainBox: {
    display: "flex !important",
    flexDirection: "column",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    "&>button": {
      display: "block",
      margin: "0 auto",
    },
  },
}));

const App = () => {
  const axios = require("axios");
  const classes = useStyles();

  const INITIAL_FORM_STATE = {
    firstName: "",
    lastName: "",
    email: "",
    date: "",
    picked: "",
  };
  const FORM_VALIDATION = Yup.object().shape({
    firstName: Yup.string()
      .required("Required")
      .min(3, "Name require atleast 3 charactres ")
      .max(25, "Name cannot have more than 25 charactres "),
    lastName: Yup.string()
      .required("Required")
      .min(3, "Last Name require atleast 3 charactres ")
      .max(25, "Last Name cannot have more than 25 charactres "),
    email: Yup.string().email("Invalid email.").required("Required"),
    date: Yup.date().notRequired(),
  });

  return (
    <Container className={classes.mainBox} data-testid="test_app">
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values) => {
          const handleValid = async () => {
            try {
              const response = await axios.get(
                `/api/email-validator.php?email=${values.email}`
              );
              alert(
                `${JSON.stringify(values, null, 2)}
                ${response.data.status_message}`
              );
            } catch (error) {
              console.error(error);
            }
          };

          handleValid();
        }}
      >
        <Form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ValidationTextField
                name="firstName"
                label="First Name*"
              ></ValidationTextField>
            </Grid>
            <Grid item xs={6}>
              <ValidationTextField
                name="lastName"
                label="Last Name*"
              ></ValidationTextField>
            </Grid>
            <Grid item xs={12}>
              <ValidationTextField
                name="email"
                label="Email*"
              ></ValidationTextField>
            </Grid>
            <Grid item xs={6}>
              <DatePickerField name="date" label="Birth Date" />
            </Grid>
            <Grid item xs={8}>
              <CheckboxWrapper
                legend="Gender"
                name={INITIAL_FORM_STATE.picked}
              />
            </Grid>
          </Grid>
          <Button>Submit</Button>
          <Typography variant="body1" style={{ color: "rgb(118, 119, 119)" }}>
            Required fields marked with *
          </Typography>
        </Form>
      </Formik>
    </Container>
  );
};

export default App;
