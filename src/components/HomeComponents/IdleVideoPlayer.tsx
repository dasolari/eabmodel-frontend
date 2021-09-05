import React, { FC, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import ReactPlayer from 'react-player/lazy';
import { Spring, animated } from 'react-spring';
import '../../styles/css/videoPlayer.scss';

interface Props {
  idleValue: boolean;
  toggleIdle: any;
}

const IdleHandler: FC<Props> = (props: Props) => {
  const { idleValue, toggleIdle } = props;
  const [videoShowing, setVideoShowing] = useState(false);
  const handleOnIdle = () => {
    toggleIdle(!idleValue);
    setVideoShowing(true);
  };

  const handleOnActive = () => {
    toggleIdle(!idleValue);
    setVideoShowing(false);
  };

  useIdleTimer({
    timeout: 1000 * 60 * 3, // 3 minutes idle time
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    debounce: 500,
  });

  const springProps = {
    from: {
      opacity: 0,
      marginTop: -500,
    },
    to: {
      opacity: 1,
      marginTop: 0,
    },
  };
  // useSpring hook didn't work
  return (
    <>
      {videoShowing && (
        <Spring from={springProps.from} to={springProps.to}>
          {(props) => (
            <animated.div style={props}>
              <div className="player-wrapper">
                <ReactPlayer
                  className="react-player"
                  url="https://www.youtube.com/watch?v=A_hNkfRS05I"
                  playing
                  loop
                  muted // It's imposible to autoplay an unmuted video because of chrome policies
                  controls
                  width="100%"
                  height="100%"
                />
              </div>
            </animated.div>
          )}
        </Spring>
      )}
    </>
  );
};

// React.memo memoitized this component so it's not rendered every time the parent re renders
// It's a good implementation for improving performance
const IdleVideoPlayer = React.memo(IdleHandler);

export default IdleVideoPlayer;
