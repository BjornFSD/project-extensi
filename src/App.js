import React, { useEffect, useState } from "react";
import "./App.css";
import { Button, Container, Input, InputAdornment } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const App = () => {
  const axios = require("axios");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const API = `/api/email-validator.php?email=${email}`;

  const validation = (name) => {
    if (name > 2) {
    }
  };

  const handleValid = async () => {
    try {
      const response = await axios.get(API);

      console.log(response.data.status_message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="xl">
      <Input
        id="input-with-icon-adornment"
        label="name"
        variant="outlined"
        onChange={(e) => setName(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <ErrorOutlineIcon />
          </InputAdornment>
        }
      />
      <Input
        id="input-with-icon-adornment"
        label="email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button variant="text" onClick={() => handleValid()}>
        Submit!
      </Button>
    </Container>
  );
};

export default App;
