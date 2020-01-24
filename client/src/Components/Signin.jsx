import React, { useState } from "react";
import Header from "./Header";
import "./Signin.scss";
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

const Signin = () => {
  const [userEmail, setUserEmail] = useState();
  const [userPass, setUserPass] = useState();

  const classes = useStyles();

  const signinForm = async event => {
    event.preventDefault();
    if (userEmail !== undefined && userEmail !== "") {
      const user = await api.post("/signin", {
        email: userEmail,
        password: userPass
      });
      localStorage.setItem("user", user.data.user._id);
    }
  };

  const handleEmailChange = value => {
    setUserEmail(value);
  };

  const handlePasswordChange = value => {
    setUserPass(value);
  };

  return (
    <div className="signin_main">
      <div className="signin_header"></div>
      <div className="signin_section">
        <Header />
        <div className="signin_main_wrapper">
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} onSubmit={signinForm}>
                <Grid container spacing={2}>
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
                  Sign In
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

export default Signin;
