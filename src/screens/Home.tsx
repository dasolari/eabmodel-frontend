import React, { FC, useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { RootState } from '../redux/store';
import { PopUpState } from '../redux/types/ModalTypes';
import { CompanyState } from '../redux/types/CompanyTypes';
import { ShopState } from '../redux/types/ShopTypes';
import { CatalogueState } from '../redux/types/CatalogueTypes';
import * as modalInteractors from '../redux/interactors/modalInteractors';
import * as catalogueInteractors from '../redux/interactors/catalogueInteractors';
import Catalogue from '../components/HomeComponents/Catalogue';
import Login from '../components/NavbarComponents/UserLogin';
import HomeAlert from '../components/HomeComponents/ShowHomeAlert';
import { Severity } from '../components/HomeComponents/ShowHomeAlert';
import { connect } from 'react-redux';
import { LinearProgress } from '@material-ui/core';
import IdleVideoPlayer from '../components/HomeComponents/IdleVideoPlayer';

interface StateProps {
  modal: PopUpState;
  company: CompanyState;
  shop: ShopState;
  catalogue: CatalogueState;
}

interface DispatchProps {
  closePopUpInteractor: typeof modalInteractors.closePopUpInteractor;
  getCatalogueInteractor: typeof catalogueInteractors.getCatalogueInteractor;
}

interface Props extends StateProps, DispatchProps {
  // extra props you want to add
}

const Home: FC<Props> = (props: Props) => {
  const { modal, company, shop, catalogue } = props;
  const [showCreateShopMessage, setShowCreateShopMessage] = useState(false);
  const [showCreateProductMessage, setShowCreateProductMessage] = useState(false);
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    // If just registered or has no shops
    if (company.registerCompanyStatus.success || shop?.shops?.length === 0 || !shop?.id) {
      setShowCreateShopMessage(true);
    } else {
      setShowCreateShopMessage(false);
    }
  }, [company.registerCompanyStatus, company]);

  useEffect(() => {
    if (!showCreateShopMessage) {
      props.getCatalogueInteractor(shop.id);
    }
  }, [props.getCatalogueInteractor, showCreateShopMessage]);

  useEffect(() => {
    // If shop has no products, show create product message
    if (catalogue?.products?.length === 0) {
      setShowCreateProductMessage(true);
    } else {
      setShowCreateProductMessage(false);
    }
  }, [catalogue]);

  const closeModal = (): void => {
    props.closePopUpInteractor();
  };

  return (
    <div>
      <IdleVideoPlayer idleValue={isIdle} toggleIdle={setIsIdle} />
      {!isIdle && (
        <>
          {catalogue.getCatalogueStatus.loading && <LinearProgress color="secondary" />}
          {showCreateShopMessage && (
            <HomeAlert
              resourceName={'shop'}
              severity={Severity.warning}
              alertTitle={'Create a shop or switch to one'}
              alertBody={[
                'It seems you are not currently in a shop, create or switch to one.',
                'You can do this by logging in as an employee and entering th Shops Menu.',
              ]}
              hasLoginButton={true}
            />
          )}
          {showCreateProductMessage && (
            <HomeAlert
              resourceName={'product'}
              severity={Severity.info}
              alertTitle={"Add a product or products to your shop's catalogue"}
              alertBody={[
                'In order to display your products, add them first.',
                'You can do that from the administrator menu.',
              ]}
              hasLoginButton={true}
            />
          )}
          {!showCreateShopMessage && !showCreateProductMessage && <Catalogue />}
          {modal.open && <Login closePopUp={closeModal} />}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    modal: state.modal,
    company: state.company,
    shop: state.shop,
    catalogue: state.catalogue,
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  ...bindActionCreators(
    {
      ...modalInteractors,
      ...catalogueInteractors,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
