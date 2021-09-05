import React, { FC, useState, useEffect } from 'react';
import { RootState } from '../redux/store';
import { connect } from 'react-redux';
import { CompanyState } from '../redux/types/CompanyTypes';
import CompanyLoginForm from '../components/CompanyAuthComponents/CompanyLoginForm';
import ShopsList from '../components/CompanyAuthComponents/ShopsList';
import CompanyRegisterForm from '../components/CompanyAuthComponents/CompanyRegisterForm';
import { useHistory } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import '../App.css';

interface StateProps {
  company: CompanyState;
}

interface Props extends StateProps {}

const CompanyAuth: FC<Props> = (props: Props) => {
  const { company } = props;
  const history = useHistory();
  const nodeRef = React.useRef(null);
  const [showShops, setShowShops] = useState(false);
  const [isSigninIn, setIsSigningIn] = useState(true);

  useEffect(() => {
    // If just logged in, redirect to shop picker
    if (company.loginCompanyStatus.success) {
      setShowShops(true);
    }
    // If just created account, redirect to home to create a shop
    // (default admin user is created, same password as company)
    if (company.registerCompanyStatus.success) {
      history.replace('/home');
    }
  }, [company.loginCompanyStatus, company.registerCompanyStatus]);

  const toggleForm = (): void => {
    setIsSigningIn(!isSigninIn);
  };

  return (
    <>
      <SwitchTransition mode={'out-in'}>
        <CSSTransition
          key={isSigninIn ? 'signinIn' : 'signinUp'}
          nodeRef={nodeRef}
          timeout={{ enter: 200, exit: 200 }}
          classNames="fade">
          {isSigninIn ? (
            <div ref={nodeRef}>
              {showShops ? <ShopsList shops={company.shops} /> : <CompanyLoginForm toggleForm={toggleForm} />}
            </div>
          ) : (
            <div ref={nodeRef}>
              <CompanyRegisterForm toggleForm={toggleForm} />
            </div>
          )}
        </CSSTransition>
      </SwitchTransition>
    </>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    company: state.company,
  };
};

export default connect(mapStateToProps)(CompanyAuth);
