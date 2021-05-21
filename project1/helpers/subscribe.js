import axios from '../components/_generic/axiosSplunk/axiosSplunk';
import { URLSUBSCRIBE, URLNOTIFYME } from '../config/setup/setup';
import httpCommonHeaders from './httpCommonHeaders';
import { getUserLocationShortName } from './user';

export const subscribeUser = async (email) => {
  const { data } = await axios({
    method: 'POST',
    url: URLSUBSCRIBE,
    validateStatus: (status) => {
      return status < 500;
    },
    headers: httpCommonHeaders(),
    data: {
      email,
      location: getUserLocationShortName(),
    },
  });
  return data;
};

export const notifyUser = async (email, dealVoucherId) => {
  return await axios({
    method: 'POST',
    url: URLNOTIFYME,
    validateStatus: (status) => {
      return status < 500;
    },
    withCredentials: true,
    headers: httpCommonHeaders(),
    data: {
      email,
      dealVoucherId,
    },
  });
};
