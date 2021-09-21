import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Container,
  Grid,
  Input,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "./components/TextField";
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
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let textColor;
  if (isValid === "Not Valid") {
    textColor = "red";
  } else textColor = "green";

  const INITIAL_FORM_STATE = {
    firstName: "",
    lastName: "",
    email: email,
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
    email: Yup.string().email("Invalid email.").required("Required Email"),
    date: Yup.date().notRequired(),
  });

  const handleValid = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/api/email-validator.php?email=${values}`
      );
      setIsValid(response.data.status_message);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleValid(email);
  }, [email]);

  return (
    <Container className={classes.mainBox} data-testid="test_app">
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values) => {
          handleValid(values.email);
          alert(`${JSON.stringify(values, null, 2)}`);
        }}
      >
        <Form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField name="firstName" label="First Name*"></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField name="lastName" label="Last Name*"></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email*"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></TextField>
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
          <Typography align="center" style={{ color: textColor }}>
            {isLoading ? <CircularProgress /> : isValid}
          </Typography>
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
