import React, { useState } from 'react';
import {
  Typography,
  Divider,
  Button,
  Grid,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@material-ui/core/';
import Box from '../components/Box';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { joinSquad, createNewSquad } from '../actions/squadActions';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  squadInfo: {
    color: theme.palette.primary.main,
    fontSize: '0.8rem'
  }
}));

export default function Squad() {
  const squad = useSelector(state => state.squad);
  const errors = useSelector(state => state.errors);

  const [squadInvitationCode, setSquadInvitationCode] = useState('');
  const [newSquadName, setNewSquadName] = useState('');

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleCreateSquad = () => {
    dispatch(createNewSquad(newSquadName));
  };

  const handleJoinSquad = () => {
    dispatch(joinSquad(squadInvitationCode));
  };

  let squadContent;

  if (Object.keys(squad).length > 1) {
    squadContent = (
      <div>
        <Box>
          <Typography variant="subtitle2">
            Squad Name: <span className={classes.squadInfo}>{squad.squadName}</span>
          </Typography>
          <Typography variant="subtitle2">
            Squad Size: <span className={classes.squadInfo}>{squad.squadProfiles.length}</span>
          </Typography>

          <Divider />
          <Typography variant="subtitle2"></Typography>
          <Alert severity="warning">Only share your invite code with people you trust.</Alert>
          <Typography variant="subtitle2">
            Invite code: <span className={classes.squadInfo}>{squad.id}</span>
          </Typography>
        </Box>
        <Typography variant="h6" style={{ marginTop: 20 }}>
          Members:
        </Typography>
      </div>
    );
  } else {
    squadContent = (
      <Grid container component="main">
        <Alert style={{ width: '100%' }} severity="error">
          You are not currently part of a squad.
        </Alert>

        <Grid item xs={12} component={Paper} elevation={0} square className={classes.paper}>
          <Typography variant="subtitle1"> You can create your own squad:</Typography>
          <form className={classes.form} noValidate>
            <TextField
              error={errors.squad && true}
              helperText={errors.squad}
              fullWidth
              variant="outlined"
              margin="normal"
              id="new-squad"
              label="New Squad Name"
              name="new-squad"
              autoComplete="new-squad"
              value={squad.newSquadName}
              onChange={e => setNewSquadName(e.target.value)}
            />
            <Button onClick={handleCreateSquad}>Create Squad</Button>
          </form>
        </Grid>
        <Grid item xs={12} component={Paper} elevation={0} square className={classes.paper}>
          <Typography variant="subtitle1"> Or join an existing squad:</Typography>
          <form className={classes.form} noValidate>
            <TextField
              error={errors.squad && true}
              helperText={errors.squad}
              fullWidth
              variant="outlined"
              margin="normal"
              id="squad"
              label="Invitation Code"
              name="squad"
              autoComplete="squad"
              value={squad.squadInvitationCode}
              onChange={e => setSquadInvitationCode(e.target.value)}
            />
            <Button onClick={handleJoinSquad}>Join Squad</Button>
          </form>
        </Grid>
      </Grid>
    );
  }

  return (
    <div>
      <Typography variant="h4">Squad</Typography>
      <Divider style={{ marginBottom: 20 }} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          {squadContent}
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <List>
          {squad.squadProfiles.map((member, idx) => (
            <div key={idx}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={member.firstName} src={member.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${member.firstName} ${member.lastName}`}
                  secondary={
                    <React.Fragment>
                      <Typography component="span" variant="body2" color="textPrimary"></Typography>
                      {member.bio}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Grid>
    </div>
  );
}
