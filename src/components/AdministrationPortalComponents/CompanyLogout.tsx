import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as companyInteractors from '../../redux/interactors/companyInteractors';
import * as shopInteractors from '../../redux/interactors/shopInteractors';
import * as userInteractors from '../../redux/interactors/userInteractors';
import * as catalogueInteractors from '../../redux/interactors/catalogueInteractors';

interface DispatchProps {
  logoutCompanyInteractor: typeof companyInteractors.logoutCompanyInteractor;
  resetShopInteractor: typeof shopInteractors.resetShopInteractor;
  logoutUserInteractor: typeof userInteractors.logoutUserInteractor;
  resetCatalogueInteractor: typeof catalogueInteractors.resetCatalogueInteractor;
  resetCompanyInteractor: typeof companyInteractors.resetCompanyInteractor;
}

interface Props extends DispatchProps {}

const CompanyLogoutButton: FC<Props> = (props: Props) => {
  const history = useHistory();
  const {
    resetShopInteractor,
    logoutUserInteractor,
    resetCatalogueInteractor,
    logoutCompanyInteractor,
    resetCompanyInteractor,
  } = props;

  const companyLogout = (): void => {
    resetShopInteractor();
    logoutUserInteractor();
    resetCatalogueInteractor();
    logoutCompanyInteractor();
    localStorage.removeItem('Token');
    resetCompanyInteractor();
    history.replace('/');
  };

  return (
    <Button variant="outlined" color="secondary" onClick={companyLogout}>
      Company Logout
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  ...bindActionCreators(
    {
      ...companyInteractors,
      ...shopInteractors,
      ...userInteractors,
      ...catalogueInteractors,
    },
    dispatch,
  ),
});

export default connect(null, mapDispatchToProps)(CompanyLogoutButton);
