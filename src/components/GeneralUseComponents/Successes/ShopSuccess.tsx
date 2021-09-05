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

const ShopSuccess: FC<Props> = (props: Props) => {
  const timeWithMargin = props.time + props.margin;
  const { time, shop, resetAddShopInteractor, resetRemoveShopInteractor, resetUpdateShopInteractor } = props;
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    if (shop.addShopStatus.success) {
      setSuccessMessage('Shop created successfully');
      setTimeout(() => {
        resetAddShopInteractor();
        setSuccessMessage('');
      }, timeWithMargin);
    }
  }, [resetAddShopInteractor, shop.addShopStatus.success, timeWithMargin]);

  useEffect(() => {
    if (shop.removeShopStatus.success) {
      setSuccessMessage('Shop deleted successfully');
      setTimeout(() => {
        resetRemoveShopInteractor();
        setSuccessMessage('');
      }, timeWithMargin);
    }
  }, [resetRemoveShopInteractor, shop.removeShopStatus.success, timeWithMargin]);

  useEffect(() => {
    if (shop.updateShopStatus.success) {
      setSuccessMessage('Shop updated successfully');
      setTimeout(() => {
        resetUpdateShopInteractor();
        setSuccessMessage('');
      }, timeWithMargin);
    }
  }, [resetUpdateShopInteractor, shop.updateShopStatus.success, timeWithMargin]);

  return (
    <>
      {successMessage.length > 0 && <SlidingMessage message={successMessage} type={MessageType.SUCCESS} time={time} />}
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(memo(ShopSuccess));
