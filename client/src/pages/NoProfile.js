import React from 'react';
import { Typography, Divider, Grid, Button } from '@material-ui/core/';
import Box from '../components/Box';
import { useHistory } from 'react-router-dom';

export default function NoProfile() {
  const history = useHistory();

  return (
    <div>
      <Typography variant="h4">No Profile</Typography>
      <Divider style={{ marginBottom: 20 }} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box>
            <img
              src={require('../assets/follow.png')}
              alt="follow"
              style={{ height: 256, width: 256 }}
            />
            <Typography variant="subtitle1">Uh oh! You don't have a profile yet.</Typography>

            <Typography variant="subtitle1">
              You will need to create a profile before you can start using Squad.
            </Typography>

            <Button onClick={() => history.push('/dashboard/new')}> Get started</Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
