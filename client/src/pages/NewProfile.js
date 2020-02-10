import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Divider, TextField, Grid, Button, Select } from '@material-ui/core/';
import Box from '../components/Box';
import { makeStyles } from '@material-ui/core/styles';
// import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import { createUserProfile } from '../actions/profileActions';

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

export default function NewProfile() {
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

  const classes = useStyles();

  const dispatch = useDispatch();

  const handleSaveProfile = () => {
    const profileInformation = {
      handle,
      bio,
      city,
      state,
      company,
      site,
      firstName,
      lastName,
      phone
    };
    dispatch(createUserProfile(profileInformation));
  };

  return (
    <div>
      <Typography variant="h4">New Profile</Typography>
      <Divider style={{ marginBottom: 20 }} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box>
            <Typography variant="h5">Public Information</Typography>

            <div className={classes.formDisplay}>
              <TextField
                error={errors.handle && true}
                helperText={errors.handle}
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
                error={errors.firstName && true}
                helperText={errors.firstName}
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
                error={errors.lastName && true}
                helperText={errors.email}
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
                error={errors.bio && true}
                helperText={errors.bio}
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
                error={errors.city && true}
                helperText={errors.city}
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
                error={errors.state && true}
                helperText={errors.state}
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
                error={errors.company && true}
                helperText={errors.company}
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
                error={errors.site && true}
                helperText={errors.site}
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

              <TextField
                error={errors.phone && true}
                helperText={errors.phone}
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
              <Button onClick={handleSaveProfile}>Save</Button>
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
