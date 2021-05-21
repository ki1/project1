import axios from '../../components/_generic/axiosSplunk/axiosSplunk';
import { TILES } from '../../config/constants/action-types';
import { URLTILES } from '../../config/setup/setup';

export const getTiles = (slug, currentApiUrl, currentNumTiles) => async (
  dispatch
) => {
  const loc = slug && slug[0] !== 'shop' ? slug[0] : '';
  let nav = '';
  let subNav = '';
  if (slug && slug[0] && slug[1]) {
    nav = `/deals/${slug[0]}/${slug[1]}`;
    if (slug[2]) {
      subNav = `${nav}/${slug[2]}`;
    }
  }

  const apiUrl = `${URLTILES}?brand=${process.env.NEXT_PUBLIC_BRAND}&location=${loc}&navigation=${nav}&subNavigation=${subNav}`;

  // no need to get same results again
  if (currentApiUrl === apiUrl && currentNumTiles !== 0) return false;
  try {
    const res = await axios(apiUrl, {
      method: 'GET',
      withCredentials: false,
    });
    const data = res.data || [];

    if (data?.error) {
      throw new Error('Tiles api error: ' + data.error);
    }
    if (Array.isArray(data)) {
      data.apiUrl = apiUrl;
      dispatch(setTiles(data, apiUrl));
      return data;
    } else {
      throw new Error('Tiles api unexpected data');
    }
  } catch (err) {
    console.error('Tiles: ', err);
  }
};

export const setTiles = (tiles, apiUrl) => (dispatch) => {
  return dispatch({ type: TILES.SET_TILES, tiles, apiUrl });
};
