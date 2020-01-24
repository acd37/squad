import React from 'react';
import { Typography } from '@material-ui/core';

export default function Copyright() {
  return (
    <div>
      <Typography variant="body2" color="textSecondary" align="center">
        {`Copyright © | ${new Date().getFullYear()}-${new Date().getFullYear() + 1}`}
      </Typography>
    </div>
  );
}
