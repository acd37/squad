import React, { useState } from 'react';
import { Typography, Divider, TextField } from '@material-ui/core/';
import Box from '../components/Box';

export default function Account() {
  const [password, setPassword] = useState('');

  return (
    <div>
      <Typography variant="h4">Account</Typography>
      <Divider style={{ marginBottom: 20 }} />

      <div>
        <Box>
          <Typography variant="h5">Reset Password</Typography>
          <Typography variant="p">Please enter your current password to get started.</Typography>
          <TextField
            required
            variant="outlined"
            margin="normal"
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Box>
      </div>
    </div>
  );
}
