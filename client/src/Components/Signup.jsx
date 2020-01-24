import React, { useState } from "react";
import Header from "./Header";
import "./Signup.scss";
import { api } from "../api";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signup = () => {
  const [userFirstName, setFirstName] = useState();
  const [userLastName, setLastName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userPass, setUserPass] = useState();

  const classes = useStyles();

  const signupForm = async event => {
    event.preventDefault();
    if (userEmail !== undefined && userEmail !== "") {
      const user = await api.post("/signup", {
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail,
        password: userPass
      });
      localStorage.setItem("user", user.data.user._id);
    }
  };

  const handleFirstNameChange = value => {
    setFirstName(value);
  };

  const handleLastNameChange = value => {
    setLastName(value);
  };

  const handleEmailChange = value => {
    setUserEmail(value);
  };

  const handlePasswordChange = value => {
    setUserPass(value);
  };

  return (
    <div className="signup_main">
      <div className="signup_header"></div>
      <div className="signup_section">
        <Header />
        <div className="signup_main_wrapper">
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <form className={classes.form} onSubmit={signupForm}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={e => handleFirstNameChange(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      onChange={e => handleLastNameChange(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={e => handleEmailChange(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={e => handlePasswordChange(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                
              </form>
            </div>
            <Box mt={5}>
            </Box>
          </Container>
          
        </div>
      </div>
    </div>
  );
};

export default Signup;
