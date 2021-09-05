import React, { FC, useState, useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RootState } from '../../../redux/store';
import { UserState } from '../../../redux/types/UserTypes';
import * as userInteractors from '../../../redux/interactors/userInteractors';
import SlidingMessage, { MessageType } from '../SlidingMessage';

interface StateProps {
  user: UserState;
}

interface DispatchProps {
  resetLoginUserInteractor: typeof userInteractors.resetLoginUserInteractor;
  resetLogoutUserInteractor: typeof userInteractors.resetLogoutUserInteractor;
  resetDeleteUserInteractor: typeof userInteractors.resetDeleteUserInteractor;
  resetRegisterUserInteractor: typeof userInteractors.resetRegisterUserInteractor;
  resetReassignUserInteractor: typeof userInteractors.resetReassignUserInteractor;
}

interface Props extends StateProps, DispatchProps {
  time: number;
  margin: number;
}

const UserSuccess: FC<Props> = (props: Props) => {
  const timeWithMargin = props.time + props.margin;
  const {
    time,
    user,
    resetLoginUserInteractor,
    resetLogoutUserInteractor,
    resetDeleteUserInteractor,
    resetRegisterUserInteractor,
    resetReassignUserInteractor,
  } = props;
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    if (user.registerUserStatus.success) {
      setSuccessMessage('Successfull user register');
      setTimeout(() => {
        resetRegisterUserInteractor();
        setSuccessMessage('');
      }, timeWithMargin);
    }
  }, [resetRegisterUserInteractor, user.registerUserStatus.success, timeWithMargin]);

  useEffect(() => {
    if (user.loginUserStatus.success) {
      setSuccessMessage('Successfull user login');
      setTimeout(() => {
        resetLoginUserInteractor();
        setSuccessMessage('');
      }, timeWithMargin);
    }
  }, [resetLoginUserInteractor, user.loginUserStatus.success, timeWithMargin]);

  useEffect(() => {
    if (user.logoutUserStatus.success) {
      setSuccessMessage('Successfull user logout');
      setTimeout(() => {
        resetLogoutUserInteractor();
        setSuccessMessage('');
      }, timeWithMargin);
    }
  }, [resetLogoutUserInteractor, user.logoutUserStatus.success, timeWithMargin]);

  useEffect(() => {
    if (user.deleteUserStatus.success) {
      setSuccessMessage('Successfull user delete');
      setTimeout(() => {
        resetDeleteUserInteractor();
        setSuccessMessage('');
      }, timeWithMargin);
    }
  }, [resetDeleteUserInteractor, user.deleteUserStatus.success, timeWithMargin]);

  useEffect(() => {
    if (user.reassignUserShopStatus.success) {
      setSuccessMessage('Succesfull reasignation of user to another shop');
      setTimeout(() => {
        resetReassignUserInteractor();
        setSuccessMessage('');
      }, timeWithMargin);
    }
  }, [resetReassignUserInteractor, user.reassignUserShopStatus.success, timeWithMargin]);

  return (
    <>
      {successMessage.length > 0 && <SlidingMessage message={successMessage} type={MessageType.SUCCESS} time={time} />}
    </>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  ...bindActionCreators(
    {
      ...userInteractors,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(UserSuccess));
