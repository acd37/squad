import React, { useState } from 'react';
import { Typography, Divider, Grid, Button } from '@material-ui/core/';
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
import { useSelector, useDispatch } from 'react-redux';
import { createStreak, deleteStreak } from '../actions/streakActions';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import GroupIcon from '@material-ui/icons/Group';

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
    margin: '20px auto'
  },
  subtitle: {
    marginTop: 30,
    marginBottom: 10
  }
}));

export default function Streaks() {
  const streaks = useSelector(state => state.streaks);
  const profileImage = useSelector(state => state.profile.avatar);
  const squadId = useSelector(state => (state.squad.id ? state.squad.id : null));
  const squad = useSelector(state => state.squad);
  const oneDay = 1000 * 60 * 60 * 24;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('individual');
  const [title, setTitle] = useState('');
  const [length, setLength] = useState();

  const dispatch = useDispatch();

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
      squadId,
      title: title,
      length: length,
      streakType: value
    };

    dispatch(createStreak(newStreak));

    handleClose();
  };

  const handleDeleteStreak = streakId => {
    dispatch(deleteStreak(streakId));
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
              <FormControlLabel
                value="squad"
                control={<Radio />}
                label="Squad"
                disabled={Object.keys(squad).length > 0 ? false : true}
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleNewStreak}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={2}>
        {streaks
          .filter(item => !item.isComplete)
          .map((item, idx) => (
            <Grid item xs={12} md={6} lg={4} key={idx}>
              <Box>
                <CardHeader
                  className={classes.header}
                  avatar={
                    item.squadId !== null ? (
                      <Avatar>
                        <GroupIcon />
                      </Avatar>
                    ) : (
                      <Avatar aria-label="recipe" src={profileImage} />
                    )
                  }
                  action={
                    <IconButton aria-label="settings">
                      <DeleteOutlineIcon onClick={() => handleDeleteStreak(item.id)} />
                    </IconButton>
                  }
                  title={item.title}
                  subheader={item.squadId !== null ? 'Squad Streak' : 'Individual Streak'}
                />
                <div className={classes.circularProgressBar}>
                  {Math.floor((new Date() - Date.parse(item.createdAt)) / oneDay) > item.length ? (
                    <CircularProgressbarWithChildren
                      value={(new Date() - Date.parse(item.createdAt)) / oneDay}
                      maxValue={item.length}
                      styles={buildStyles({
                        pathColor: '#e8b923'
                      })}
                    >
                      <div style={{ fontSize: '1.2rem' }}>
                        <Typography variant="overline">
                          {item.length} /{item.length}
                        </Typography>
                        <br />
                        <Typography variant="overline">Completed!!</Typography>
                      </div>
                    </CircularProgressbarWithChildren>
                  ) : (
                    <CircularProgressbarWithChildren
                      value={(new Date() - Date.parse(item.createdAt)) / oneDay}
                      maxValue={item.length}
                      styles={buildStyles({
                        pathColor: '#fe446c'
                      })}
                    >
                      <div style={{ fontSize: '1.2rem' }}>
                        {Math.floor((new Date() - Date.parse(item.createdAt)) / oneDay)} /
                        {item.length}
                      </div>
                    </CircularProgressbarWithChildren>
                  )}
                </div>
              </Box>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
