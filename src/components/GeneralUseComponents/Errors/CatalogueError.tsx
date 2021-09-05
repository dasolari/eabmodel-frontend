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
  resetGetCatalogueInteractor: typeof catalogueInteractors.resetGetCatalogueInteractor;
  resetAddProductToCatalogueInteractor: typeof catalogueInteractors.resetAddProductToCatalogueInteractor;
  resetAddProductsToCatalogueInteractor: typeof catalogueInteractors.resetAddProductsToCatalogueInteractor;
  resetDeleteProductFromCatalogueInteractor: typeof catalogueInteractors.resetDeleteProductFromCatalogueInteractor;
  resetEditProductFromCatalogueInteractor: typeof catalogueInteractors.resetEditProductFromCatalogueInteractor;
}

interface Props extends StateProps, DispatchProps {
  time: number;
  margin: number;
}

const CatalogueError: FC<Props> = (props: Props) => {
  const timeWithMargin = props.time + props.margin;
  const {
    time,
    catalogue,
    resetGetCatalogueInteractor,
    resetAddProductToCatalogueInteractor,
    resetAddProductsToCatalogueInteractor,
    resetDeleteProductFromCatalogueInteractor,
    resetEditProductFromCatalogueInteractor,
  } = props;
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (catalogue.getCatalogueStatus.error) {
      setErrorMessage(String(catalogue.getCatalogueStatus.error));
      setTimeout(() => {
        resetGetCatalogueInteractor();
        setErrorMessage('');
      }, timeWithMargin);
    }
  }, [resetGetCatalogueInteractor, catalogue.getCatalogueStatus.error, timeWithMargin]);

  useEffect(() => {
    if (catalogue.addProductToCatalogueStatus.error) {
      setErrorMessage(String(catalogue.addProductToCatalogueStatus.error));
      setTimeout(() => {
        resetAddProductToCatalogueInteractor();
        setErrorMessage('');
      }, timeWithMargin);
    }
  }, [resetAddProductToCatalogueInteractor, catalogue.addProductToCatalogueStatus.error, timeWithMargin]);

  useEffect(() => {
    if (catalogue.addProductsToCatalogueStatus.error) {
      setErrorMessage(String(catalogue.addProductsToCatalogueStatus.error));
      setTimeout(() => {
        resetAddProductsToCatalogueInteractor();
        setErrorMessage('');
      }, timeWithMargin);
    }
  }, [resetAddProductsToCatalogueInteractor, catalogue.addProductsToCatalogueStatus.error, timeWithMargin]);

  useEffect(() => {
    if (catalogue.deleteProductFromCatalogueStatus.error) {
      setErrorMessage(String(catalogue.deleteProductFromCatalogueStatus.error));
      setTimeout(() => {
        resetDeleteProductFromCatalogueInteractor();
        setErrorMessage('');
      }, timeWithMargin);
    }
  }, [resetDeleteProductFromCatalogueInteractor, catalogue.deleteProductFromCatalogueStatus.error, timeWithMargin]);

  useEffect(() => {
    if (catalogue.editProductFromCatalogueStatus.error) {
      setErrorMessage(String(catalogue.editProductFromCatalogueStatus.error));
      setTimeout(() => {
        resetEditProductFromCatalogueInteractor();
        setErrorMessage('');
      }, timeWithMargin);
    }
  }, [resetEditProductFromCatalogueInteractor, catalogue.editProductFromCatalogueStatus.error, timeWithMargin]);

  return (
    <>{errorMessage.length > 0 && <SlidingMessage message={errorMessage} type={MessageType.ERROR} time={time} />}</>
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

export default connect(mapStateToProps, mapDispatchToProps)(memo(CatalogueError));
