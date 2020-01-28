import React, { useState } from 'react';
import {
  Typography,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core/';
import Box from '../components/Box';
import { makeStyles } from '@material-ui/core/styles';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined';
import LocalBarOutlinedIcon from '@material-ui/icons/LocalBarOutlined';
import SmokeFreeOutlinedIcon from '@material-ui/icons/SmokeFreeOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import DirectionsRunOutlinedIcon from '@material-ui/icons/DirectionsRunOutlined';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { formatPhoneNumber } from '../utils/phoneNumberFormat';

import { createMessage } from '../actions/messageActions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
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
  text: {
    color: theme.palette.primary.main
  },
  circularProgressBar: {
    width: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    margin: '0 auto'
  },
  handle: {
    color: theme.palette.primary.main
  }
}));

export default function Profile() {
  const profile = {
    handle: 'acd37',
    avatar: require('../assets/images/alec.jpg'),
    firstName: 'Alec',
    lastName: 'Down',
    jobTitle: 'Developer',
    email: 'alecdown@gmail.com',
    phone: '8018213438',
    site: 'alecdown.com',
    city: 'Nashville',
    state: 'TN',
    company: '2U, Inc.',
    squad: {
      squadName: 'Career Services'
    },
    streaks: [
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
    ]
  };
  const classes = useStyles();

  const dispatch = useDispatch();

  return (
    <div>
      <Typography variant="h4">Profile</Typography>
      <Divider style={{ marginBottom: 20 }} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <Box>
            <Typography variant="h5">Profile Details</Typography>
            <div className={classes.flexBox}>
              <img src={profile.avatar} alt="profile" className={classes.profileImage} />
              <Typography variant="subtitle1" className={classes.handle}>
                @{profile.handle}
              </Typography>

              <Typography variant="subtitle1">
                {profile.firstName} {profile.lastName}
              </Typography>
              <Typography variant="subtitle2">{profile.jobTitle}</Typography>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Box>
            <Typography variant="h5">Streaks</Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              {profile.streaks.map((item, idx) => (
                <div key={idx}>
                  <div className={classes.circularProgressBar}>
                    <CircularProgressbarWithChildren
                      value={item.streak}
                      maxValue={item.length}
                      styles={buildStyles({
                        pathColor: '#fe446c'
                      })}
                    >
                      <span style={{ color: '#fe446c' }}>{item.icon}</span>
                    </CircularProgressbarWithChildren>
                    <span style={{ fontSize: '0.5rem', marginTop: 5 }}>{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Box>
            <Typography variant="h5">About</Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <HomeOutlinedIcon />
                </ListItemIcon>
                <span style={{ marginRight: 4 }}>Lives in</span>{' '}
                <ListItemText
                  primary={`${profile.city}, ${profile.state}`}
                  className={classes.text}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <WorkOutlineOutlinedIcon />
                </ListItemIcon>
                <span style={{ marginRight: 4 }}>Works at</span>
                <ListItemText primary={profile.company} className={classes.text} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <GroupOutlinedIcon />
                </ListItemIcon>
                <span style={{ marginRight: 4 }}>Squad Member of</span>
                <ListItemText primary={profile.squad.squadName} className={classes.text} />
              </ListItem>
            </List>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Box>
            <Typography variant="h5">Contact</Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <EmailOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={profile.email} className={classes.text} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CallOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={formatPhoneNumber(profile.phone)} className={classes.text} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LanguageOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={profile.site} className={classes.text} />
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
