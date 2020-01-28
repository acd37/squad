import { CREATE_MESSAGE } from './types';

// create message
export const createMessage = (msg, type) => {
  return {
    type: CREATE_MESSAGE,
    payload: { msg }
  };
};
