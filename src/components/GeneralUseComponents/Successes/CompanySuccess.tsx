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

const CompanySuccess: FC<Props> = (props: Props) => {
  const timeWithMargin = props.time + props.margin;
  const { time, company, resetRegisterCompanyInteractor, resetLoginCompanyInteractor, resetLogoutCompanyInteractor } =
    props;
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    if (company.registerCompanyStatus.success) {
      setSuccessMessage('Company created successfully');
      setTimeout(() => {
        resetRegisterCompanyInteractor();
        setSuccessMessage('');
      }, timeWithMargin);
    }
  }, [resetRegisterCompanyInteractor, company.registerCompanyStatus.success, timeWithMargin]);

  useEffect(() => {
    if (company.loginCompanyStatus.success) {
      setSuccessMessage('Successfull company login');
      setTimeout(() => {
        resetLoginCompanyInteractor();
        setSuccessMessage('');
      }, timeWithMargin);
    }
  }, [resetLoginCompanyInteractor, company.loginCompanyStatus.success, timeWithMargin]);

  useEffect(() => {
    if (company.logoutCompanyStatus.success) {
      setSuccessMessage('Successfull company logout');
      setTimeout(() => {
        resetLogoutCompanyInteractor();
        setSuccessMessage('');
      }, timeWithMargin);
    }
  }, [resetLogoutCompanyInteractor, company.logoutCompanyStatus.success, timeWithMargin]);

  return (
    <>
      {successMessage.length > 0 && <SlidingMessage message={successMessage} type={MessageType.SUCCESS} time={time} />}
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(memo(CompanySuccess));
