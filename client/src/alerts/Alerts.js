import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { withAlert } from 'react-alert';

const Alerts = ({ alert }) => {
  const messages = useSelector(state => state.messages);

  if (messages.registration) {
    alert.success(messages.registration);
  }

  if (messages.squad) {
    alert.success(messages.squad);
  }
  return <Fragment />;
};

export default withAlert()(Alerts);
