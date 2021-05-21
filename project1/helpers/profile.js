import axios from '../components/_generic/axiosSplunk/axiosSplunk';
import { URLUSER } from '../config/setup/setup';
import httpCommonHeaders from './httpCommonHeaders';

const Profile = async () => {
  const { data } = await axios({
    method: 'GET',
    url: URLUSER + `?origin=${location.origin}`,
    validateStatus: (status) => {
      return status < 500;
    },
    withCredentials: true,
    headers: httpCommonHeaders(),
  });

  return data;
};

export default Profile;
