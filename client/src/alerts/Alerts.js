import React, { useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { withAlert } from 'react-alert';

const Alerts = ({ alert }) => {
  const messages = useSelector(state => state.messages);

  if (messages.registration) {
    alert.info(messages.registration);
  }
  return <Fragment />;
};

export default withAlert()(Alerts);
