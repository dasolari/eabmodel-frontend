import React, { FC, useState, useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RootState } from '../../../redux/store';
import { ShopState } from '../../../redux/types/ShopTypes';
import * as shopInteractors from '../../../redux/interactors/shopInteractors';
import SlidingMessage, { MessageType } from '../SlidingMessage';

interface StateProps {
  shop: ShopState;
}

interface DispatchProps {
  resetAddShopInteractor: typeof shopInteractors.resetAddShopInteractor;
  resetRemoveShopInteractor: typeof shopInteractors.resetRemoveShopInteractor;
  resetUpdateShopInteractor: typeof shopInteractors.resetUpdateShopInteractor;
}

interface Props extends StateProps, DispatchProps {
  time: number;
  margin: number;
}

const ShopError: FC<Props> = (props: Props) => {
  const timeWithMargin = props.time + props.margin;
  const { time, shop, resetAddShopInteractor, resetRemoveShopInteractor, resetUpdateShopInteractor } = props;
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (shop.addShopStatus.error) {
      setErrorMessage(String(shop.addShopStatus.error));
      setTimeout(() => {
        resetAddShopInteractor();
        setErrorMessage('');
      }, timeWithMargin);
    }
  }, [resetAddShopInteractor, shop.addShopStatus.error, timeWithMargin]);

  useEffect(() => {
    if (shop.removeShopStatus.error) {
      setErrorMessage(String(shop.removeShopStatus.error));
      setTimeout(() => {
        resetRemoveShopInteractor();
        setErrorMessage('');
      }, timeWithMargin);
    }
  }, [resetRemoveShopInteractor, shop.removeShopStatus.error, timeWithMargin]);

  useEffect(() => {
    if (shop.updateShopStatus.error) {
      setErrorMessage(String(shop.updateShopStatus.error));
      setTimeout(() => {
        resetUpdateShopInteractor();
        setErrorMessage('');
      }, timeWithMargin);
    }
  }, [resetUpdateShopInteractor, shop.updateShopStatus.error, timeWithMargin]);

  return (
    <>{errorMessage.length > 0 && <SlidingMessage message={errorMessage} type={MessageType.ERROR} time={time} />}</>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    shop: state.shop,
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  ...bindActionCreators(
    {
      ...shopInteractors,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(ShopError));
