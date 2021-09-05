import React, { FC, useEffect, useState } from 'react';
import useStyles from '../../styles/UserRegisterStyles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Divider,
  AccordionActions,
  Button,
  TextField,
  LinearProgress,
} from '@material-ui/core';
import DissmisibleSuccessAlert from '../GeneralUseComponents/DissmissibleSuccessAlert';
import { RootState } from '../../redux/store';
import { ShopState } from '../../redux/types/ShopTypes';
import { CompanyState } from '../../redux/types/CompanyTypes';
import { PostUserFields, UserState } from '../../redux/types/UserTypes';
import verifyString from '../../utils/globalHelpers/verifyString';
import { bindActionCreators } from '@reduxjs/toolkit';
import * as userInteractors from '../../redux/interactors/userInteractors';
import { connect } from 'react-redux';
import { Alert } from '@material-ui/lab';

const validateEmail = (email: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

interface StateProps {
  shop: ShopState;
  company: CompanyState;
  user: UserState;
}

interface DispatchProps {
  registerUserInteractor: typeof userInteractors.registerUserInteractor;
}

interface Props extends StateProps, DispatchProps {
  expanded: string | false;
  handleChange: (panel: string) => any;
  panel: string;
  heading: string;
  summary: string;
}

const CreateUser: FC<Props> = (props: Props) => {
  const { expanded, handleChange, panel, heading, summary, user, shop, company, registerUserInteractor } = props;
  const styles = useStyles();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (user.registerUserStatus.success) {
      setShowSuccessMessage(true);
    }
  }, [user.registerUserStatus, setShowSuccessMessage]);

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

  const handleCancelCreate = (): void => {
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const handleCreate = (): void => {
    const userAuthFields: PostUserFields = {
      username,
      email,
      companyId: company.id,
      shopId: shop.id,
      password,
    };

    registerUserInteractor(userAuthFields);
    // Called to reset the state
    handleCancelCreate();
  };

  const fieldsVerified: boolean =
    verifyString(username) && validateEmail(email) && verifyString(email) && verifyString(password);

  const emailAlert = () => {
    if (emailError === '') {
      return;
    } else {
      return <Alert severity="warning">{emailError}</Alert>;
    }
  };

  const passwordAlert = () => {
    if (passwordError === '') {
      return;
    } else {
      return <Alert severity="warning">{passwordError}</Alert>;
    }
  };

  return (
    <Accordion TransitionProps={{ unmountOnExit: true }} expanded={expanded === panel} onChange={handleChange(panel)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
        <Typography className={styles.heading}>{heading}</Typography>
        <Typography className={styles.secondaryHeading}>{summary}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          value={username}
          variant="standard"
          required
          fullWidth
          id="name"
          label="Username"
          name="username"
          onChange={(event) => setUsername(event.target.value)}
        />
      </AccordionDetails>
      <AccordionDetails>
        <TextField
          value={email}
          variant="standard"
          required
          fullWidth
          id="name"
          label="Email"
          name="email"
          onChange={onEmailChange}
        />
      </AccordionDetails>
      {emailAlert()}
      <AccordionDetails>
        <TextField
          value={password}
          variant="standard"
          type="password"
          required
          fullWidth
          id="name"
          label="Password"
          name="password"
          onChange={onPasswordChange}
        />
      </AccordionDetails>
      {passwordAlert()}
      <Divider />
      <AccordionActions>
        <Button size="small" onClick={() => handleCancelCreate()}>
          Cancel
        </Button>
        <Button size="small" color="primary" disabled={!fieldsVerified} onClick={handleCreate}>
          Create User
        </Button>
      </AccordionActions>
      {user.registerUserStatus.loading && <LinearProgress />}
      {showSuccessMessage && (
        <DissmisibleSuccessAlert
          message={'Employee user successfully created, you can close this menu now.'}
          openedStateInParent={setShowSuccessMessage}
        />
      )}
    </Accordion>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    shop: state.shop,
    company: state.company,
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
