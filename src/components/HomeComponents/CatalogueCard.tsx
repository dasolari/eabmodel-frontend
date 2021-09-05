import React, { FC, useCallback } from 'react';
import UseStyles from '../../styles/CatalogueCardStyles';
import { useHistory } from 'react-router-dom';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';

interface Props {
  specs: {
    id: string;
    name: string;
    brand: string;
    os: string;
    color: string;
    inches: number;
    price: number;
    image: string;
  };
}

export const CatalogueCard: FC<Props> = ({ specs }: Props) => {
  const styles = UseStyles();
  const history = useHistory();

  const goToDetails = useCallback((productId: string) => {
    history.push(`product/${productId}/details`);
  }, []);

  return (
    <Card className={styles.root}>
      <CardActionArea style={{ textAlign: 'left' }}>
        <CardMedia className={styles.media} image={specs?.image} title="Device" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {specs.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" component="p">
            {specs.brand}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" component="p">
            {specs.os} {specs.color}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" component="p">
            {specs.inches} inches display
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            These phones are really good, buy them now.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => goToDetails(specs.id)}>
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

CatalogueCard.defaultProps = {
  specs: {
    id: '0',
    name: 'Defaut Device',
    brand: 'Default Brand',
    os: 'Default OS',
    color: 'Default Color',
    inches: 5,
    price: 0,
    image: 'image url',
  },
};
