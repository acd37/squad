import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { registerUser } from '../actions/authActions';
import Copyright from '../utils/Copyright';
import { Avatar, Button, TextField, Paper, Box, Grid, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import PasswordStrengthMeter from '../utils/PasswordStrengthMeter';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: `url(${require('../assets/images/girlfriends.jpeg')})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main
  }
}));

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth.isAuthenticated);
  const errors = useSelector(state => state.errors);

  useEffect(() => {
    if (auth) {
      history.push('/dashboard/profile');
    }
  });

  useEffect(() => {
    if (errors) {
      console.log(errors);
    }
  });

  const handleRegister = e => {
    e.preventDefault();
    // check validation
    dispatch(registerUser({ email, password, password2 }, history));
  };

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Register
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              error={errors.email && true}
              helperText={errors.email}
              required
              fullWidth
              autoFocus
              variant="outlined"
              margin="normal"
              id="email"
              label="Email address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              error={errors.password && true}
              helperText={errors.password}
              required
              fullWidth
              variant="outlined"
              margin="normal"
              id="password"
              label="Password"
              name="password"
              type="password"
              autoComplete="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {/*<PasswordStrengthMeter password={password} />*/}

            <TextField
              error={errors.password2 && true}
              helperText={errors.password2}
              required
              fullWidth
              variant="outlined"
              margin="normal"
              id="password2"
              label="Confirm password"
              name="password2"
              type="password"
              autoComplete="password2"
              value={password2}
              onChange={e => setPassword2(e.target.value)}
            />

            <Button fullWidth className={classes.submit} onClick={handleRegister} type="submit">
              Register
            </Button>

            <Grid container>
              <Grid item xs>
                Already have an account?{' '}
                <Link to="/" className={classes.link}>
                  Back to login.
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Register;
