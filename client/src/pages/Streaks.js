import React, { useState } from 'react';
import { Typography, Divider, Grid, Button } from '@material-ui/core/';
import LocalBarOutlinedIcon from '@material-ui/icons/LocalBarOutlined';
import SmokeFreeOutlinedIcon from '@material-ui/icons/SmokeFreeOutlined';
import DirectionsRunOutlinedIcon from '@material-ui/icons/DirectionsRunOutlined';
import Box from '../components/Box';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
  formControl: {
    marginTop: theme.spacing(3)
  },
  circularProgressBar: {
    width: 150,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    margin: '0 auto'
  },
  customBar: {}
}));

export default function Streaks() {
  const [streaks, setStreaks] = useState([
    {
      id: 0,
      squadId: 123,
      title: 'No drinking',
      length: 7,
      icon: <LocalBarOutlinedIcon />,
      streak: 3
    },
    {
      id: 1,
      squadId: 123,
      title: 'No smoking',
      length: 7,
      icon: <SmokeFreeOutlinedIcon />,
      streak: 7
    },
    {
      id: 2,
      squadId: 123,
      title: 'Run every day for a month',
      length: 30,
      icon: <DirectionsRunOutlinedIcon />,
      streak: 12
    }
  ]);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('individual');
  const [title, setTitle] = React.useState('');
  const [length, setLength] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleNewStreak = event => {
    const newStreak = {
      id: streaks.length + 1,
      squadId: 123,
      title: title,
      length: length,
      icon: '',
      streak: 0
    };

    setStreaks(existingStreaks => [...existingStreaks, newStreak]);
    handleClose();
  };

  const classes = useStyles();

  return (
    <div>
      <Typography variant="h4">Streaks</Typography>
      <Divider style={{ marginBottom: 20 }} />

      <Button startIcon={<AddIcon />} onClick={handleClickOpen}>
        Add Streak
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Streak</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the following details and hit submit to start a new streak!
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            onChange={e => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="length"
            label="Length in Days"
            type="number"
            fullWidth
            onChange={e => setLength(e.target.value)}
          />
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Is this an individal Streak or a squad Streak?</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
              <FormControlLabel value="individual" control={<Radio />} label="Individual" />
              <FormControlLabel value="squad" control={<Radio />} label="Squad" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleNewStreak}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={2}>
        {streaks.map((item, idx) => (
          <Grid item xs={12} md={6} lg={4} key={idx}>
            <Box>
              <div className={classes.circularProgressBar}>
                <CircularProgressbarWithChildren
                  value={item.streak}
                  maxValue={item.length}
                  styles={buildStyles({
                    pathColor: '#fe446c'
                  })}
                >
                  <span style={{ color: '#fe446c' }}>{item.icon}</span>
                  <div style={{ fontSize: '1.2rem' }}>
                    {item.streak} / {item.length}
                  </div>
                </CircularProgressbarWithChildren>
              </div>
              <p style={{ textAlign: 'center' }}>{item.title}</p>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
