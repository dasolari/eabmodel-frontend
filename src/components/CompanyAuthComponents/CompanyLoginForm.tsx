import React, { FC, useState } from 'react';
import UseStyles from '../../styles/LogInStyles';
import { bindActionCreators } from 'redux';
import { RootState } from '../../redux/store';
import { connect } from 'react-redux';
import { CompanyState, PostCompanyFields } from '../../redux/types/CompanyTypes';
import * as companyInteractors from '../../redux/interactors/companyInteractors';
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Card,
  CircularProgress,
} from '@material-ui/core';

interface StateProps {
  company: CompanyState;
}

interface DispatchProps {
  loginCompanyInteractor: typeof companyInteractors.loginCompanyInteractor;
}

interface Props extends StateProps, DispatchProps {
  toggleForm: () => void;
}

const CompanyLoginForm: FC<Props> = (props: Props) => {
  const styles = UseStyles();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { company, loginCompanyInteractor } = props;

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  const handleSubmit = (): void => {
    const authFields: PostCompanyFields = {
      name,
      password,
    };
    loginCompanyInteractor(authFields);
    setName('');
    setPassword('');
  };

  return (
    <Card className={styles.popUp} component="main" variant="outlined">
      <CssBaseline />
      <div className={styles.paper}>
        {company.loginCompanyStatus.loading && <CircularProgress />}
        <Typography component="h1" variant="h5">
          Company Sign in
        </Typography>
        <div className={styles.form}>
          <TextField
            value={name}
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
            value={password}
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
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit}
            disabled={!(name && password)}
            onClick={handleSubmit}>
            Company Sign In
          </Button>
        </div>
      </div>
      <Button color="default" size="small" onClick={props.toggleForm}>
        Don&apos;t have a company, create one
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

export default connect(mapStateToProps, mapDispatchToProps)(CompanyLoginForm);
