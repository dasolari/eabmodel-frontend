import React, { FC } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalInteractors from '../../redux/interactors/modalInteractors';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Button } from '@material-ui/core';
import '../../styles/css/homeStyles.scss';

export enum Severity {
  error = 'error',
  warning = 'warning',
  info = 'info',
  success = 'success',
}

interface DispatchProps {
  showPopUpInteractor: typeof modalInteractors.showPopUpInteractor;
}

interface Props extends DispatchProps {
  resourceName: string;
  severity: any;
  alertTitle: string;
  alertBody: string[];
  hasLoginButton: boolean;
}

const HomeAlert: FC<Props> = (props: Props) => {
  const { showPopUpInteractor, resourceName, severity, alertTitle, alertBody, hasLoginButton } = props;
  return (
    <div className="alert-container">
      <Alert className="alert" variant="filled" severity={severity}>
        <AlertTitle className="alert-title">{alertTitle}</AlertTitle>
        {alertBody.map((message) => (
          <p key={message} className="alert-text">
            {message}
          </p>
        ))}
        {hasLoginButton && (
          <div className="button-container">
            <Button variant="contained" onClick={showPopUpInteractor}>
              Sign in to create {resourceName}
            </Button>
          </div>
        )}
      </Alert>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  ...bindActionCreators(
    {
      ...modalInteractors,
    },
    dispatch,
  ),
});

export default connect(null, mapDispatchToProps)(HomeAlert);
