import React, { FC } from 'react';
import { Typography, Button } from '@material-ui/core';
import UseStyles from '../../styles/AdministrationPortalStyles';

interface Props {
  title: string;
  body: string;
  callback: () => void;
}

const MenuSection: FC<Props> = (props: Props) => {
  const styles = UseStyles();
  const { title, body, callback } = props;
  return (
    <div className={styles.section}>
      <Typography variant="h5" color="textPrimary">
        {title} Menu
      </Typography>
      <Typography variant="body1" color="textPrimary" component="p">
        {body}
      </Typography>
      <div className={styles.buttonContainer}>
        <Button variant="contained" onClick={callback}>
          Go to {title} Menu
        </Button>
      </div>
    </div>
  );
};

export default MenuSection;
