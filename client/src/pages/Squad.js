import React, { useState } from 'react';
import {
  Typography,
  Divider,
  Button,
  Grid,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import Box from '../components/Box';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  squadInfo: {
    color: theme.palette.primary.main,
    fontSize: '0.8rem'
  }
}));

export default function Squad() {
  const squad = useSelector(state => state.squad);

  const classes = useStyles();

  return (
    <div>
      <Typography variant="h4">Squad</Typography>
      <Divider style={{ marginBottom: 20 }} />

      <Button startIcon={<AddIcon />}>Add User</Button>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box>
            <Typography variant="subtitle2">
              Squad Name: <span className={classes.squadInfo}>{squad.squadName}</span>
            </Typography>
            <Typography variant="subtitle2">
              Squad Size: <span className={classes.squadInfo}></span>
            </Typography>
            <Typography variant="subtitle2">
              Captain: <span className={classes.squadInfo}></span>
            </Typography>
            <Divider />
            <Typography variant="subtitle2"></Typography>
            <Alert severity="warning">Only share your invite code with people you trust.</Alert>
            <Typography variant="subtitle2">
              Invite code: <span className={classes.squadInfo}>{squad.id}</span>
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="h6" style={{ marginTop: 20 }}>
        Members:
      </Typography>

      <Grid container spacing={2}>
        {/*{squad.map((item, idx) => (*/}
        {/*  <Grid item xs={12} key={idx}>*/}
        {/*    <Box>*/}
        {/*      <ListItem alignItems="flex-start">*/}
        {/*        <ListItemAvatar>*/}
        {/*          <Avatar alt={item.firstName} src={item.avatar} />*/}
        {/*        </ListItemAvatar>*/}
        {/*        <ListItemText*/}
        {/*          primary={`${item.firstName} ${item.lastName}`}*/}
        {/*          secondary={*/}
        {/*            <React.Fragment>*/}
        {/*              <Typography component="span" variant="body2" color="textPrimary"></Typography>*/}
        {/*              {item.bio}*/}
        {/*            </React.Fragment>*/}
        {/*          }*/}
        {/*        />*/}
        {/*      </ListItem>*/}
        {/*    </Box>*/}
        {/*  </Grid>*/}
        {/*))}*/}
      </Grid>
    </div>
  );
}
