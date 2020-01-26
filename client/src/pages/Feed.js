import React, { useState } from 'react';
import {
  Typography,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@material-ui/core/';
import Box from '../components/Box';

export default function Feed() {
  const [feed, setFeed] = useState([
    {
      user: 'Alec',
      comment: 'This is a post',
      avatar: require('../assets/images/alec.jpg')
    },
    {
      user: 'John',
      comment: 'This is a post',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    {
      user: 'Wendy',
      comment: 'This is a post',
      avatar: 'https://randomuser.me/api/portraits/women/59.jpg'
    },
    {
      user: 'Sarah',
      comment: 'This is a post',
      avatar: 'https://randomuser.me/api/portraits/women/41.jpg'
    }
  ]);

  return (
    <div>
      <Typography variant="h4">Feed</Typography>
      <Divider style={{ marginBottom: 20 }} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box>
            <List>
              {feed.map((item, idx) => (
                <div key={idx}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={item.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.user}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          ></Typography>
                          {item.comment}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
