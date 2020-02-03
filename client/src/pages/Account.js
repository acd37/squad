import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Divider, TextField, Grid, Button, Select } from '@material-ui/core/';
import Box from '../components/Box';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import { updateUserProfile, updatePassword } from '../actions/profileActions';

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
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [company, setCompany] = useState('');
  const [site, setSite] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [handle, setHandle] = useState('');

  const errors = useSelector(state => state.errors);
  const profile = useSelector(state => state.profile);
  const userEmail = useSelector(state => state.auth.user.email);

  useEffect(() => {
    setHandle(profile.handle);
  }, [profile.handle]);

  useEffect(() => {
    setBio(profile.bio);
  }, [profile.bio]);

  useEffect(() => {
    setCity(profile.city);
  }, [profile.city]);

  useEffect(() => {
    setState(profile.state);
  }, [profile.state]);

  useEffect(() => {
    setCompany(profile.company);
  }, [profile.company]);

  useEffect(() => {
    setSite(profile.site);
  }, [profile.site]);

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

  const dispatch = useDispatch();

  const handleSavePublicInformation = () => {
    const publicInformation = { handle, bio, city, state, company, site };
    dispatch(updateUserProfile(publicInformation));
  };

  const handleSavePrivateInformation = () => {
    const privateInformation = { firstName, lastName, phone };
    dispatch(updateUserProfile(privateInformation));
  };

  const handleUpdatePassword = () => {
    const passwordInformation = { password, newPassword, newPassword2 };
    dispatch(updatePassword(passwordInformation));
    setPassword('');
    setNewPassword('');
    setNewPassword2('');
  };

  return (
    <div>
      <Typography variant="h4">Account</Typography>
      <Divider style={{ marginBottom: 20 }} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box>
            <Typography variant="h5">Public Information</Typography>
            <div className={classes.formDisplaySingleLine}>
              <TextField
                fullWidth
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
            </div>

            <div className={classes.formDisplaySingleLine}>
              <TextField
                fullWidth
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
            </div>
            <div className={classes.formDisplay}>
              <TextField
                variant="outlined"
                margin="normal"
                id="city"
                label="City"
                name="city"
                type="text"
                autoComplete="city"
                value={city}
                onChange={e => setCity(e.target.value)}
              />
              <Select
                native
                style={{ width: 100 }}
                variant="outlined"
                margin="normal"
                id="state"
                label="State"
                name="state"
                type="text"
                autoComplete="state"
                value={state}
                onChange={e => setState(e.target.value)}
              >
                <option value="" />
                <option value="AL">AL</option>
                <option value="AK">AK</option>
                <option value="AZ">AZ</option>
                <option value="CA">CA</option>
                <option value="CO">CO</option>
                <option value="CT">CT</option>
                <option value="DE">DE</option>
                <option value="FL">FL</option>
                <option value="GA">GA</option>
                <option value="HI">HI</option>
                <option value="ID">ID</option>
                <option value="IL">IL</option>
                <option value="IN">IN</option>
                <option value="IA">IA</option>
                <option value="KS">KS</option>
                <option value="KY">KY</option>
                <option value="LA">LA</option>
                <option value="ME">ME</option>
                <option value="MD">MD</option>
                <option value="MA">MA</option>
                <option value="MI">MI</option>
                <option value="MN">MN</option>
                <option value="MS">MS</option>
                <option value="MO">MO</option>
                <option value="MT">MT</option>
                <option value="NE">NE</option>
                <option value="NV">NV</option>
                <option value="NH">NH</option>
                <option value="NJ">NJ</option>
                <option value="NM">NM</option>
                <option value="NY">NY</option>
                <option value="NC">NC</option>
                <option value="ND">ND</option>
                <option value="OH">OH</option>
                <option value="OK">OK</option>
                <option value="OR">OR</option>
                <option value="PA">PA</option>
                <option value="RI">RI</option>
                <option value="SC">SC</option>
                <option value="SD">SD</option>
                <option value="TN">TN</option>
                <option value="TX">TX</option>
                <option value="UT">UT</option>
                <option value="VT">VT</option>
                <option value="VA">VA</option>
                <option value="WA">WA</option>
                <option value="WV">WV</option>
                <option value="WV">WV</option>
                <option value="WI">WI</option>
                <option value="WY">WY</option>
              </Select>

              <TextField
                variant="outlined"
                margin="normal"
                id="company"
                label="Company"
                name="company"
                type="text"
                autoComplete="company"
                value={company}
                onChange={e => setCompany(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                id="site"
                label="Website"
                name="site"
                type="text"
                autoComplete="site"
                value={site}
                onChange={e => setSite(e.target.value)}
              />
            </div>
            <div className={classes.formDisplay}>
              <Button onClick={handleSavePublicInformation}>Save</Button>
            </div>
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
                disabled
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
            <div className={classes.formDisplaySingleLine}>
              <Button onClick={handleSavePrivateInformation}>Save</Button>
            </div>
          </Box>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Box>
            <Typography variant="h5">Reset Password</Typography>
            <Typography variant="body2">
              Please enter your current password to get started.
            </Typography>
            <form>
              <div className={classes.formDisplaySingleLine}>
                <TextField
                  error={errors.password && true}
                  helperText={errors.password}
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
              </div>
              <div className={classes.formDisplaySingleLine}>
                <TextField
                  error={errors.newPassword && true}
                  helperText={errors.newPassword}
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
              </div>
              <div className={classes.formDisplaySingleLine}>
                <TextField
                  error={errors.newPassword2 && true}
                  helperText={errors.newPassword2}
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
              </div>
              <div className={classes.formDisplaySingleLine}>
                <Button onClick={handleUpdatePassword}>Save</Button>
              </div>
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
