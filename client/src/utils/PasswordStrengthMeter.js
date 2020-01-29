import React, { Component } from 'react';
import './PasswordStrengthMeter.css';
import zxcvbn from 'zxcvbn';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  ratingBox: {
    marginTop: 20,
    marginBottom: 20
  },
  ratingText: {
    fontSize: '1.1rem',
    color: '#fe446c'
    // fontWeight: 300
  }
}));

const StyledRating = withStyles({
  iconFilled: {
    color: '#fe446c'
  }
})(Rating);

const PasswordStrengthMeter = props => {
  const { password } = props;
  const testedResult = zxcvbn(password);

  const createPasswordLabel = result => {
    console.log(result);
    switch (result.score) {
      case 0:
        return 'Weak. Please make your password harder to crack.';
      case 1:
        return "Fair. It's a start.";
      case 2:
        return 'Good. Getting better.';
      case 3:
        return "Strong. You're pretty secure.";
      case 4:
        return 'Awesome! This is a secure password.';
      default:
        return 'Weak';
    }
  };

  const classes = useStyles();

  return (
    <div className="password-strength-meter">
      {password && (
        <div className={classes.ratingBox}>
          <StyledRating
            readOnly
            name="customized-color"
            defaultValue={0}
            value={testedResult.score}
            max={4}
            getLabelText={value => `${value} Heart${value !== 1 ? 's' : ''}`}
            precision={1}
            icon={<FavoriteIcon fontSize="inherit" />}
          />
          <Typography className={classes.ratingText} component="legend">
            {createPasswordLabel(testedResult)}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;
