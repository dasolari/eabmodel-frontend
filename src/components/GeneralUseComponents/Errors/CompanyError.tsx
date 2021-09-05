import React, { FC, useState, useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RootState } from '../../../redux/store';
import { CompanyState } from '../../../redux/types/CompanyTypes';
import * as companyInteractors from '../../../redux/interactors/companyInteractors';
import SlidingMessage, { MessageType } from '../SlidingMessage';

interface StateProps {
  company: CompanyState;
}

interface DispatchProps {
  resetRegisterCompanyInteractor: typeof companyInteractors.resetRegisterCompanyInteractor;
  resetLoginCompanyInteractor: typeof companyInteractors.resetLoginCompanyInteractor;
  resetLogoutCompanyInteractor: typeof companyInteractors.resetLogoutCompanyInteractor;
}

interface Props extends StateProps, DispatchProps {
  time: number;
  margin: number;
}

const CompanyError: FC<Props> = (props: Props) => {
  const timeWithMargin = props.time + props.margin;
  const { time, company, resetRegisterCompanyInteractor, resetLoginCompanyInteractor, resetLogoutCompanyInteractor } =
    props;
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (company.registerCompanyStatus.error) {
      setErrorMessage(String(company.registerCompanyStatus.error));
      setTimeout(() => {
        resetRegisterCompanyInteractor();
        setErrorMessage('');
      }, timeWithMargin);
    }
  }, [resetRegisterCompanyInteractor, company.registerCompanyStatus.error, timeWithMargin]);

  useEffect(() => {
    if (company.loginCompanyStatus.error) {
      setErrorMessage(String(company.loginCompanyStatus.error));
      setTimeout(() => {
        resetLoginCompanyInteractor();
        setErrorMessage('');
      }, timeWithMargin);
    }
  }, [resetLoginCompanyInteractor, company.loginCompanyStatus.error, timeWithMargin]);

  useEffect(() => {
    if (company.logoutCompanyStatus.error) {
      setErrorMessage(String(company.logoutCompanyStatus.error));
      setTimeout(() => {
        resetLogoutCompanyInteractor();
        setErrorMessage('');
      }, timeWithMargin);
    }
  }, [resetLogoutCompanyInteractor, company.logoutCompanyStatus.error, timeWithMargin]);

  return (
    <>{errorMessage.length > 0 && <SlidingMessage message={errorMessage} type={MessageType.ERROR} time={time} />}</>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    company: state.company,
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  ...bindActionCreators(
    {
      ...companyInteractors,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(CompanyError));
