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
  }
}));

export default function Profile() {
  const [password, setPassword] = useState('');
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h4">Profile</Typography>
      <Divider style={{ marginBottom: 20 }} />

      <Grid container spacing={2}>
        <Grid item sm={12} md={6} lg={3}>
          <Box>
            <Typography variant="h5">Profile Details</Typography>
            <div className={classes.flexBox}>
              <img
                src={require('../assets/images/alec.jpg')}
                alt="profile"
                className={classes.profileImage}
              />
              <Typography variant="subtitle1">Alec Down</Typography>
              <Typography variant="subtitle2">Developer</Typography>
            </div>
          </Box>
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          <Box>
            <Typography variant="h5">About</Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <HomeOutlinedIcon />
                </ListItemIcon>
                <span style={{ marginRight: 4 }}>Lives in</span>{' '}
                <ListItemText primary="Nashville, TN" className={classes.text} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <WorkOutlineOutlinedIcon />
                </ListItemIcon>
                <span style={{ marginRight: 4 }}>Works at</span>
                <ListItemText primary="2U, Inc" className={classes.text} />
              </ListItem>
            </List>
          </Box>
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          <Box>
            <Typography variant="h5">Contact</Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <EmailOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="alecdown@gmail.com" className={classes.text} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CallOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="801-821-3438" className={classes.text} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LanguageOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="alecdown.com" className={classes.text} />
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
