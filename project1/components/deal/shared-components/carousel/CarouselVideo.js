import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player/file';
import DealMobileScrim from '../dealMobileScrim';
import ThemeContext from '../../../../providers/ThemeProvider';
import { useDispatch, useSelector } from 'react-redux';
import {
  playVideo,
  setVideoVisibility,
  stopVideo,
} from '../../../../redux/actions/video';
import classNames from 'classnames';
import { replaceImageServer } from '../../../../helpers/image';
import { getIsPlaying } from '../../../../helpers/video';
import PlayButton from './PlayButton';
import debounce from 'lodash/debounce';
import WrapLink from '../../../_generic/utils/WrapLink';

const useClientSideEffect =
  typeof window === 'undefined' ? () => {} : useLayoutEffect;

const CarouselVideo = ({
  deal = {},
  href = null,
  showScrim = false,
  showControls = false,
  isClosed = false,
}) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);
  const playing = useSelector((s) => s.video.playing);
  const canAutoPlay = useSelector((s) => s.video.autoPlayable[deal.id]);
  const isVisible = useSelector((s) => s.video.visibility[deal.id]);
  const poster = replaceImageServer(deal.id, deal.images[0]);
  const [isActive, setIsActive] = useState(false);

  const isPlaying = getIsPlaying({
    deal,
    isVisible,
    canAutoPlay,
    playing,
  });

  // when we first switch to playing state we activate the video module
  useEffect(() => {
    if (isPlaying) {
      setIsActive(true);
    }
  }, [isPlaying]);

  // visibility
  useClientSideEffect(() => {
    const cb = debounce(() => {
      if (ref.current) {
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;
        const box = ref.current.getBoundingClientRect();
        dispatch(
          setVideoVisibility(deal.id, box.bottom > 0 && box.top < windowHeight)
        );
      }
    }, 500);

    cb();
    document.addEventListener('scroll', cb, { passive: true });
    return () => {
      document.removeEventListener('scroll', cb, { passive: true });
    };
  }, [dispatch, ref, deal.id]);

  const togglePlayback = () => {
    if (isPlaying) {
      dispatch(stopVideo(deal.id));
    } else {
      dispatch(playVideo(deal.id));
    }
  };

  // when we have native controls we need to hook into the events to set the global state
  const onPlay = () => {
    if (showControls) {
      dispatch(playVideo(deal.id));
    }
  };
  const onPause = () => {
    if (showControls && isVisible) {
      dispatch(stopVideo(deal.id));
    }
  };

  // ios will fail to play if we don't pass it the manifest directly.
  const videoId = deal.video.videoUrl.substring(
    deal.video.videoUrl.lastIndexOf('/') + 1
  );
  const videoSource = `https://videodelivery.net/${videoId}/manifest/video.m3u8`;

  return (
    <>
      <div ref={ref} className="deal-video__wrapper">
        {!showControls && (
          <PlayButton isPlaying={isPlaying} togglePlayback={togglePlayback} />
        )}
        <WrapLink href={!showControls ? href : undefined}>
          <ReactPlayer
            className={classNames('deal-video', {
              'deal-video--closed': isClosed,
            })}
            url={videoSource}
            playing={isPlaying}
            light={isActive ? false : poster}
            controls={showControls}
            width="100%"
            height="100%"
            loop
            playsinline
            volume={0}
            muted
            playIcon={<div />}
            onPlay={onPlay}
            onPause={onPause}
            config={{
              file: {
                attributes: { poster: poster },
                hlsOptions: {
                  debug: false,
                  capLevelToPlayerSize: true,
                  maxBufferLength: 4, // sec
                  maxBufferSize: 1000 * 1000, // 1MB
                  startLevel: 0,
                },
              },
            }}
          />
        </WrapLink>
      </div>
      {showScrim && <DealMobileScrim />}

      <style jsx>{`
        .deal-video__wrapper {
          position: relative;
          height: 0;
          width: 100%;
          padding-bottom: 66.9%; /* force to image ratio 777 x 520 */
          background-color: black;
          cursor: pointer;
          overflow: hidden;
        }
        :global(.deal-video) {
          position: absolute;
          top: 0;
          left: 0;
          height: 100% !important;
          width: 100%;
          display: flex;
          align-items: center;
        }
        :global(.deal-video--closed:after) {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background-color: rgba(50, 50, 50, 0.7);
        }
        :global(.deal-video__button-listing svg) {
          color: ${theme.colors.dealvideoicon};
        }
        :global(.deal-video__button-listing) {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 999;
          background: none;
          border: none;
          filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7));
          padding: 0;
        }
      `}</style>
    </>
  );
};

CarouselVideo.propTypes = {
  deal: PropTypes.object,
  showScrim: PropTypes.bool,
  showControls: PropTypes.bool,
  isClosed: PropTypes.bool,
  href: PropTypes.string,
};

export default CarouselVideo;
