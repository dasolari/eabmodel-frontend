import React, { FC, useState } from 'react';
import UseStyles from '../../styles/LogInStyles';
import { bindActionCreators } from 'redux';
import { RootState } from '../../redux/store';
import { connect } from 'react-redux';
import { CompanyState, RegisterCompanyFields } from '../../redux/types/CompanyTypes';
import * as companyInteractors from '../../redux/interactors/companyInteractors';
import { Button, CssBaseline, TextField, Typography, Card, CircularProgress } from '@material-ui/core';

const validateEmail = (email: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

interface StateProps {
  company: CompanyState;
}

interface DispatchProps {
  registerCompanyInteractor: typeof companyInteractors.registerCompanyInteractor;
}

interface Props extends StateProps, DispatchProps {
  toggleForm: () => void;
}

const CompanyRegisterForm: FC<Props> = (props: Props) => {
  const styles = UseStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const { company } = props;

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    if (value) {
      if (!validateEmail(value)) {
        setEmailError('This must be an email');
      } else {
        setEmailError('');
      }
    } else {
      setEmailError('');
    }
    setEmail(value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    if (value && value.length <= 7) {
      setPasswordError('Password must be longer than 7 characters');
    } else {
      setPasswordError('');
    }
    setPassword(value);
  };

  const onConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    if (password !== value) {
      setConfirmPasswordError("Passwords don't match");
    } else {
      setConfirmPasswordError('');
    }
    setConfirmPassword(value);
  };

  const handleSubmit = (): void => {
    const authFields: RegisterCompanyFields = {
      name,
      email,
      password,
    };
    props.registerCompanyInteractor(authFields);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const registerCondition =
    name && email && !emailError && password && !passwordError && confirmPassword && !confirmPasswordError;

  return (
    <Card className={styles.popUp} component="main" variant="outlined">
      <CssBaseline />
      <div className={styles.paper}>
        {company.registerCompanyStatus.loading && <CircularProgress />}
        <Typography component="h1" variant="h5">
          Company Sign Up
        </Typography>
        <div className={styles.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Company name"
            name="name"
            autoFocus
            onChange={onNameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Company email"
            name="email"
            onChange={onEmailChange}
          />
          <Typography variant="body2" className={styles.alertMessage}>
            {emailError}
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={onPasswordChange}
          />
          <Typography variant="body2" className={styles.alertMessage}>
            {passwordError}
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm password"
            type="password"
            id="confirmPassword"
            onChange={onConfirmPasswordChange}
          />
          <Typography variant="body2" className={styles.alertMessage}>
            {confirmPasswordError}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit}
            disabled={!registerCondition}
            onClick={handleSubmit}>
            Company Sign Up
          </Button>
          {company.registerCompanyStatus.error && (
            <Typography>An error ocurred, probably the company already exists.</Typography>
          )}
        </div>
      </div>
      <Button color="default" size="small" onClick={props.toggleForm}>
        Already have a company, sign in instead
      </Button>
    </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(CompanyRegisterForm);
