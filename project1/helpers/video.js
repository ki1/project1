import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NUMBER_OF_DEALS } from '../config/links/links';
import { setVideoAutoPlayable } from '../redux/actions/video';
import { getIsOpen } from './deals';

export function useVideoScroll() {
  const dispatch = useDispatch();
  const deals = useSelector((s) => s.deals);
  const router = useRouter();

  // set auto playable deals
  useEffect(() => {
    let found = false;
    const partial = {};

    const main = deals.mainDeal;
    if (main.video && main.video.videoUrl && getIsOpen(main, router.query)) {
      partial[main.id] = true;
      found = true;
    }

    if (!found) {
      for (let i = 0; i < deals.secondary_deals.length; i++) {
        const deal = deals.secondary_deals[i];
        if (deal.video && deal.video.videoUrl) {
          partial[deal.id] = true;
          found = true;
          break;
        }
      }
    }

    deals.deals.forEach((deal, i) => {
      if (i % NUMBER_OF_DEALS === 0) {
        found = false;
      }
      const hasVideo = deal.video && deal.video.videoUrl;
      if (!found && hasVideo) {
        partial[deal.id] = true;
        found = true;
      }
    });

    dispatch(setVideoAutoPlayable(partial));
  }, [dispatch, deals, router.query]);
}

export const getIsPlaying = ({ deal, isVisible, canAutoPlay, playing }) => {
  if (!isVisible) {
    return false;
  }

  if (playing === null) {
    return canAutoPlay;
  } else {
    return playing === deal.id;
  }
};
