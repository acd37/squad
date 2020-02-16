import React from 'react';
import { useSelector } from 'react-redux';
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
// import LocalBarOutlinedIcon from '@material-ui/icons/LocalBarOutlined';
// import SmokeFreeOutlinedIcon from '@material-ui/icons/SmokeFreeOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
// import DirectionsRunOutlinedIcon from '@material-ui/icons/DirectionsRunOutlined';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { formatPhoneNumber } from '../utils/phoneNumberFormat';

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
  const classes = useStyles();

  const profile = useSelector(state => state.profile);
  const streaks = useSelector(state => state.streaks);
  const userEmail = useSelector(state => state.auth.user.email);
  const squad = useSelector(state => state.squad);

  const oneDay = 1000 * 60 * 60 * 24;

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
            <div style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
              {streaks.map((item, idx) => (
                <div key={idx} style={{ marginRight: 10 }}>
                  <div className={classes.circularProgressBar}>
                    <CircularProgressbarWithChildren
                      value={(new Date() - Date.parse(item.createdAt)) / oneDay}
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
                <ListItemText primary={squad.squadName} className={classes.text} />
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
                <ListItemText primary={userEmail} className={classes.text} />
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
