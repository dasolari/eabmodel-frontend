import React, { FC, useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton, Collapse } from '@material-ui/core';

interface Props {
  message: string;
  openedStateInParent: any;
}

const DissmisibleSuccessAlert: FC<Props> = (props: Props) => {
  const { message, openedStateInParent } = props;
  const [open, setOpen] = useState(true);

  const handleClose = (): void => {
    setOpen(false);
    setTimeout(() => {
      openedStateInParent(false);
    }, 2000);
  };

  return (
    <div>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton aria-label="close" color="inherit" size="small" onClick={handleClose}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }>
          {message}
        </Alert>
      </Collapse>
    </div>
  );
};

export default DissmisibleSuccessAlert;
