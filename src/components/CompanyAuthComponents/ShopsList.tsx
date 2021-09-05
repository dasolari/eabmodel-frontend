import React, { FC, useEffect } from 'react';
import UseStyles from '../../styles/CompanyAuthStyles';
import { ShopBackendState } from '../../redux/types/CompanyTypes';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as shopInteractors from '../../redux/interactors/shopInteractors';
import { Button, Typography } from '@material-ui/core';

interface DispatchProps {
  setShopInteractor: typeof shopInteractors.setShopInteractor;
  setShopsInteractor: typeof shopInteractors.setShopsInteractor;
}

interface Props extends DispatchProps {
  shops: ShopBackendState[];
}

const CompanyLoginForm: FC<Props> = (props: Props) => {
  const styles = UseStyles();
  const history = useHistory();
  const { shops, setShopInteractor, setShopsInteractor } = props;

  useEffect(() => {
    // If company has not created a shop, redirect to home to allow it to do that
    if (shops?.length === 0) {
      history.replace('/home');
    } else {
      setShopsInteractor(shops);
    }
  }, []);

  const login = (shop: ShopBackendState): void => {
    setShopInteractor(shop);
    history.replace('/home');
  };

  return (
    <div className={styles.page}>
      <Typography variant="h2" color="textSecondary">
        Choose Shop
      </Typography>
      <div className={styles.containerList}>
        {shops?.map((shop: ShopBackendState) => (
          <div className={styles.shopContainer} key={shop.id}>
            <div>
              <p className={styles.name}>{shop.name}</p>
              <p className={styles.location}>{shop.location}</p>
            </div>
            <div className={styles.buttonContainer}>
              <Button variant="contained" color="primary" onClick={() => login(shop)}>
                Login as this Shop
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  ...bindActionCreators(
    {
      ...shopInteractors,
    },
    dispatch,
  ),
});

export default connect(null, mapDispatchToProps)(CompanyLoginForm);
