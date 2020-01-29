import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Typography, Divider, TextField, Grid, Button } from '@material-ui/core/';
import Box from '../components/Box';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  formDisplay: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  formDisplaySingleLine: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: '50%',
    margin: '20px 0'
  },
  flexBox: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  subText: {
    color: 'rgba(0,0,0,0.7)',
    fontSize: '0.7rem',
    textAlign: 'center'
  }
}));

export default function Account() {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [email, setEmail] = useState('alecdown@gmail.com');
  const [firstName, setFirstName] = useState('Alec');
  const [lastName, setLastName] = useState('Down');
  const [phone, setPhone] = useState('801-821-3438');
  const [bio, setBio] = useState('This is a short biography about me and who I am.');
  const [handle, setHandle] = useState('');

  const profile = useSelector(state => state.profile);
  const userEmail = useSelector(state => state.auth.user.email);

  useEffect(() => {
    setHandle(profile.handle);
  }, [profile.handle]);

  useEffect(() => {
    setBio(profile.bio);
  }, [profile.bio]);

  useEffect(() => {
    setFirstName(profile.firstName);
  }, [profile.firstName]);

  useEffect(() => {
    setLastName(profile.lastName);
  }, [profile.lastName]);

  useEffect(() => {
    setEmail(userEmail);
  }, [userEmail]);

  useEffect(() => {
    setPhone(profile.phone);
  }, [profile.phone]);

  useEffect(() => {
    setPassword(profile.password);
  }, [profile.password]);

  useEffect(() => {
    setNewPassword(profile.newPassword);
  }, [profile.newPassword]);

  useEffect(() => {
    setNewPassword2(profile.newPassword2);
  }, [profile.newPassword2]);

  const classes = useStyles();

  return (
    <div>
      <Typography variant="h4">Account</Typography>
      <Divider style={{ marginBottom: 20 }} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box>
            <Typography variant="h5">Public Information</Typography>
            <TextField
              required
              variant="outlined"
              margin="normal"
              id="handle"
              label="Handle"
              name="handle"
              type="text"
              autoComplete="handle"
              value={handle}
              onChange={e => setHandle(e.target.value)}
            />
            <TextField
              multiline
              rows="4"
              variant="outlined"
              margin="normal"
              id="bio"
              label="Bio"
              name="bio"
              type="text"
              autoComplete="bio"
              value={bio}
              onChange={e => setBio(e.target.value)}
            />
            <Button>Save</Button>
          </Box>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Box>
            <Typography variant="h5">Private Information</Typography>
            <div className={classes.formDisplay}>
              <TextField
                required
                style={{ width: 234 }}
                variant="outlined"
                margin="normal"
                id="firstName"
                label="First name"
                name="firstName"
                type="text"
                autoComplete="firstName"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
              <TextField
                required
                style={{ width: 234 }}
                variant="outlined"
                margin="normal"
                id="lastName"
                label="Last name"
                name="lastName"
                type="text"
                autoComplete="lastName"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </div>
            <div className={classes.formDisplaySingleLine}>
              <TextField
                required
                fullWidth
                variant="outlined"
                margin="normal"
                id="email"
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className={classes.formDisplaySingleLine}>
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                id="phone"
                label="Phone"
                name="phone"
                type="text"
                autoComplete="phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
            <Button>Save</Button>
          </Box>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Box>
            <Typography variant="h5">Reset Password</Typography>
            <Typography variant="body2">
              Please enter your current password to get started.
            </Typography>
            <form>
              <TextField
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
              <Typography variant="body2">Please enter a new password.</Typography>
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                id="newPassword"
                label="New Password"
                name="newPassword"
                type="password"
                autoComplete="newPassword"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                id="newPassword2"
                label="Password"
                name="newPassword2"
                type="password"
                autoComplete="newPassword2"
                value={newPassword2}
                onChange={e => setNewPassword2(e.target.value)}
              />
              <Button>Save</Button>
            </form>
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box>
            <Typography variant="h5">Profile Image</Typography>
            <div className={classes.flexBox}>
              <img src={profile.avatar} alt="profile" className={classes.profileImage} />
              <Button
                startIcon={<CloudUploadOutlinedIcon />}
                style={{ paddingRight: 20, paddingLeft: 20 }}
              >
                Upload
              </Button>
              <p className={classes.subText}>
                For best results, use an image at least 128px by 128px in .jpg format
              </p>
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
