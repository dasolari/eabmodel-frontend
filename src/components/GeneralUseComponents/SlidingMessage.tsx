import React, { FC, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import { animated, useTransition } from 'react-spring';

export enum MessageType {
  SUCCESS = 'success',
  ERROR = 'error',
}

interface Props {
  message: string | boolean;
  type: MessageType;
  time: number;
}

const SlidingMessage: FC<Props> = ({ message, type, time }: Props) => {
  let animationTimeout = useRef<any>(null).current;
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const transition = useTransition(isVisible, {
    from: { y: -100, opacity: 0, margin: '4px 0', boxShadow: '5px 6px 12px -4px rgba(0,0,0,0.75)' },
    enter: { y: 0, opacity: 1, margin: '4px 0', boxShadow: '5px 8px 15px -8px rgba(0,0,0,0.9)' },
    leave: { y: -100, opacity: 0, margin: '4px 0', boxShadow: '5px 6px 12px -4px rgba(0,0,0,0.75)' },
  });

  useEffect(() => {
    clearTimeout(animationTimeout);
    animationTimeout = setTimeout(() => {
      setIsVisible(false);
    }, time);
  }, []);

  const handleClose = () => {
    clearTimeout(animationTimeout);
    setIsVisible(false);
  };

  return (
    <>
      {transition((style, item) =>
        item ? (
          <animated.div style={style}>
            <Alert severity={type} onClose={handleClose}>
              {message}
            </Alert>
          </animated.div>
        ) : (
          ''
        ),
      )}
    </>
  );
};

SlidingMessage.propTypes = {
  message: PropTypes.string.isRequired || PropTypes.bool.isRequired,
  type: PropTypes.any,
  time: PropTypes.number.isRequired,
};

export default SlidingMessage;
