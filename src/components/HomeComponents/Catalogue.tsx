import React, { FC } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import { CatalogueState, Product } from '../../redux/types/CatalogueTypes';
import { CatalogueCard } from './CatalogueCard';
import UseStyles from '../../styles/CatalogueStyles';
import Box from '@material-ui/core/Box';

interface StateProps {
  catalogue: CatalogueState;
}

type Props = StateProps;

const Catalogue: FC<Props> = (props: Props) => {
  const classes = UseStyles();
  const { catalogue } = props;
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="space-evenly" m={1} p={1} bgcolor="background.paper">
      {catalogue?.products.map((product: Product) => (
        <Box className={classes.cardContainer} key={product.id}>
          <CatalogueCard specs={product} />
        </Box>
      ))}
    </Box>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    catalogue: state.catalogue,
  };
};

export default connect(mapStateToProps)(Catalogue);
