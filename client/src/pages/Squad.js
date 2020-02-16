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
import { joinSquad, createNewSquad, updateSquad } from '../actions/squadActions';
import { formatPhoneNumber } from '../utils/phoneNumberFormat';

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
  },
  profileCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  image: {
    borderRadius: '50%',
    height: 80,
    width: 80,
    filter: 'grayscale(100%)'
  },
  name: {
    color: theme.palette.primary.main
  },
  edit: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: '0.5rem',
    marginLeft: 10,
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  }
}));

export default function Squad() {
  const squad = useSelector(state => state.squad);
  const errors = useSelector(state => state.errors);

  const [editable, setEditable] = useState(false);
  const [squadInvitationCode, setSquadInvitationCode] = useState('');
  const [newSquadName, setNewSquadName] = useState('');
  const [squadName, setSquadName] = useState('');

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleCreateSquad = () => {
    dispatch(createNewSquad(newSquadName));
  };

  const handleJoinSquad = () => {
    dispatch(joinSquad(squadInvitationCode));
  };

  const handleUpdateSquad = () => {
    dispatch(updateSquad({ squadName, squadId: squad.id }));
    setEditable(false);
  };

  let squadContent;

  if (Object.keys(squad).length > 1) {
    squadContent = (
      <div>
        <Box>
          <Typography variant="subtitle2">
            Squad Name:{' '}
            {editable ? (
              <span>
                <input
                  placeholder={squad.squadName}
                  value={squadName}
                  onChange={e => setSquadName(e.target.value)}
                />
                <span className={classes.edit} onClick={() => setEditable(!editable)}>
                  Cancel
                </span>
                <span className={classes.edit} onClick={handleUpdateSquad}>
                  Save
                </span>
              </span>
            ) : (
              <span>
                <span className={classes.squadInfo}>{squad.squadName}</span>
                <span className={classes.edit} onClick={() => setEditable(!editable)}>
                  Edit
                </span>
              </span>
            )}
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
        {squad.squadProfiles.map((member, idx) => (
          <Grid item xs={12} md={4} lg={3} key={idx}>
            <Box>
              <div className={classes.profileCard}>
                <img className={classes.image} alt={member.firstName} src={member.avatar} />
                <Typography
                  className={classes.name}
                  variant="overline"
                  display="block"
                  gutterBottom
                >
                  {member.firstName} {member.lastName}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  {member.handle}{' '}
                </Typography>
                <Typography variant="overline" display="block">
                  {member.email}{' '}
                </Typography>
                <Typography variant="overline" display="block">
                  {member.phone.length > 0 ? formatPhoneNumber(member.phone) : 'No phone'}
                </Typography>
                <Typography variant="overline" display="block">
                  {member.city}, {member.state}
                </Typography>
              </div>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
