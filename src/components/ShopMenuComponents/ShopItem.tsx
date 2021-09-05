import React, { FC } from 'react';
import { Button, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

interface Props {
  shop: any;
}

const ShopItem: FC<Props> = (props: Props) => {
  const { shop } = props;
  const history = useHistory();

  const handleGoToDevices = (id: string): void => {
    history.push(`/administration/shop/${id}`);
  };

  return (
    <ListItem key={shop.id} button>
      <ListItemText id={shop.id} primary={`${shop.name}`} secondary={`Location: ${shop.location}`} />
      <ListItemSecondaryAction>
        <Button size="small" variant="contained" onClick={() => handleGoToDevices(shop.id)}>
          View devices
        </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ShopItem;
