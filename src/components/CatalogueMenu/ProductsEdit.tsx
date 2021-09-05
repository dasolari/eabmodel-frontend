import React, { FC, useState, useEffect } from 'react';
import useStyles from '../../styles/AccordionMenuStyles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import { ShopState } from '../../redux/types/ShopTypes';
import { CatalogueState } from '../../redux/types/CatalogueTypes';
import * as catalogueInteractors from '../../redux/interactors/catalogueInteractors';
import EditProduct from '../../components/CatalogueMenu/ProductEdit';
import { Product } from '../../redux/types/CatalogueTypes';
import { UserState } from '../../redux/types/UserTypes';

interface StateProps {
  shop: ShopState;
  catalogue: CatalogueState;
  user: UserState;
}

interface DispatchProps {
  getCatalogueInteractor: typeof catalogueInteractors.getCatalogueInteractor;
}

interface Props extends StateProps, DispatchProps {}

const ProductsShow: FC<Props> = (props: Props) => {
  const styles = useStyles();
  const { catalogue } = props;
  const [products, setProducts] = useState<Product[]>(catalogue.products);

  useEffect(() => {
    setProducts(catalogue.products);
  }, [props.getCatalogueInteractor, catalogue.getCatalogueStatus.success]);

  return (
    <>
      {products.length ? (
        <div className={styles.mainContainer}>
          <h3>Edit a Product</h3>
        </div>
      ) : null}
      {products.map((product) => {
        return (
          <EditProduct
            key={product.id}
            panel={'panel1'}
            heading={product.name}
            summary={'Press to edit this product'}
            product={product}
          />
        );
      })}
    </>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    shop: state.shop,
    catalogue: state.catalogue,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  ...bindActionCreators(
    {
      ...catalogueInteractors,
    },
    dispatch,
  ),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductsShow);
