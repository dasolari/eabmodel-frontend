import React, { FC, useState, useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RootState } from '../../../redux/store';
import { CatalogueState } from '../../../redux/types/CatalogueTypes';
import * as catalogueInteractors from '../../../redux/interactors/catalogueInteractors';
import SlidingMessage, { MessageType } from '../SlidingMessage';

interface StateProps {
  catalogue: CatalogueState;
}

interface DispatchProps {
  resetAddProductToCatalogueInteractor: typeof catalogueInteractors.resetAddProductToCatalogueInteractor;
  resetAddProductsToCatalogueInteractor: typeof catalogueInteractors.resetAddProductsToCatalogueInteractor;
  resetDeleteProductFromCatalogueInteractor: typeof catalogueInteractors.resetDeleteProductFromCatalogueInteractor;
  resetEditProductFromCatalogueInteractor: typeof catalogueInteractors.resetEditProductFromCatalogueInteractor;
}

interface Props extends StateProps, DispatchProps {
  time: number;
  margin: number;
}

const CatalogueSuccess: FC<Props> = (props: Props) => {
  const timeWithMargin = props.time + props.margin;
  const {
    time,
    catalogue,
    resetAddProductToCatalogueInteractor,
    resetAddProductsToCatalogueInteractor,
    resetDeleteProductFromCatalogueInteractor,
    resetEditProductFromCatalogueInteractor,
  } = props;
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    if (catalogue.addProductToCatalogueStatus.success) {
      setSuccessMessage('Product created successfully');
      setTimeout(() => {
        resetAddProductToCatalogueInteractor();
        setSuccessMessage('');
      }, timeWithMargin);
    }
  }, [resetAddProductToCatalogueInteractor, catalogue.addProductToCatalogueStatus.success, timeWithMargin]);

  useEffect(() => {
    if (catalogue.addProductsToCatalogueStatus.success) {
      setSuccessMessage('List of products created successfully');
      setTimeout(() => {
        resetAddProductsToCatalogueInteractor();
        setSuccessMessage('');
      }, timeWithMargin);
    }
  }, [resetAddProductsToCatalogueInteractor, catalogue.addProductsToCatalogueStatus.success, timeWithMargin]);

  useEffect(() => {
    if (catalogue.deleteProductFromCatalogueStatus.success) {
      setSuccessMessage('Product deleted successfully');
      setTimeout(() => {
        resetDeleteProductFromCatalogueInteractor();
        setSuccessMessage('');
      }, timeWithMargin);
    }
  }, [resetDeleteProductFromCatalogueInteractor, catalogue.deleteProductFromCatalogueStatus.success, timeWithMargin]);

  useEffect(() => {
    if (catalogue.editProductFromCatalogueStatus.success) {
      setSuccessMessage('Product edited successfully');
      setTimeout(() => {
        resetEditProductFromCatalogueInteractor();
        setSuccessMessage('');
      }, timeWithMargin);
    }
  }, [resetEditProductFromCatalogueInteractor, catalogue.editProductFromCatalogueStatus.success, timeWithMargin]);

  return (
    <>
      {successMessage.length > 0 && <SlidingMessage message={successMessage} type={MessageType.SUCCESS} time={time} />}
    </>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    catalogue: state.catalogue,
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

export default connect(mapStateToProps, mapDispatchToProps)(memo(CatalogueSuccess));
