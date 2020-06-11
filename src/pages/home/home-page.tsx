import React from 'react';
import LoginForm from 'containers/login-form';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import background from 'assets/img/home-background.png';
import logo from 'assets/img/logo.svg';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    minHeight: 'max-content',
    padding: theme.spacing(4),
    display: 'flex',
    backgroundImage: `url(${background})`,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backgroundSize: 'cover',
  },
  logo: {
    margin: theme.spacing(0, 0, 4, 0),
  },
}));

const HomePage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid spacing={3} container direction="column" justify="center" alignItems="center">
        <Grid item>
          <img src={logo} alt="" className={classes.logo} />
        </Grid>
        <Grid item>
          <LoginForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
