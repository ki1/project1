import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import { PAUSE_VIDEO, PLAY_VIDEO } from '../../../../config/text/text';

const PlayButton = ({ isPlaying, togglePlayback }) => {
  return (
    <button
      className="deal-video__button-listing"
      aria-label={isPlaying ? PAUSE_VIDEO : PLAY_VIDEO}
      onClick={(e) => {
        e.stopPropagation();
        togglePlayback();
      }}
    >
      <FontAwesomeIcon
        style={{
          height: 50,
          width: 50,
        }}
        icon={isPlaying ? faPauseCircle : faPlayCircle}
      />
    </button>
  );
};

PlayButton.propTypes = {
  togglePlayback: PropTypes.func,
  isPlaying: PropTypes.bool,
};

PlayButton.defaultProps = {
  togglePlayback: () => false,
  isPlaying: false,
};

export default PlayButton;
