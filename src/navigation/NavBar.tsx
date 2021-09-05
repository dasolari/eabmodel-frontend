import React, { FC } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../redux/store';
import { UserState } from '../redux/types/UserTypes';
import { CompanyState } from '../redux/types/CompanyTypes';
import * as userInteractors from '../redux/interactors/userInteractors';
import * as modalInteractors from '../redux/interactors/modalInteractors';
import { AppBar, Button, Toolbar, Typography, IconButton } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { useHistory } from 'react-router-dom';
import { useStyles } from '../styles/NavBarStyles';

interface StateProps {
  user: UserState;
  company: CompanyState;
}

interface DispatchProps {
  logoutUserInteractor: typeof userInteractors.logoutUserInteractor;
  showPopUpInteractor: typeof modalInteractors.showPopUpInteractor;
}

interface Props extends StateProps, DispatchProps {
  // extra props you want to add
}

const NavBar: FC<Props> = (props: Props) => {
  const { user, company } = props;
  const history = useHistory();
  const styles = useStyles();

  const openPopUp = (): void => {
    props.showPopUpInteractor();
  };

  const logOut = (): void => {
    props.logoutUserInteractor();
    localStorage.removeItem('Token');
    history.replace('/home');
  };

  const informationsPage = (): void => {
    history.replace('/information');
  };

  return (
    <AppBar position="static" className={styles.root}>
      <Toolbar>
        <Typography variant="h6" className={styles.title}>
          {user.sessionType === 'ANONYMOUS' ? `Hello Dear Customer!` : `Hello ${user.username}!`}
        </Typography>
        {user.sessionType === 'ANONYMOUS' ? (
          <>
            <Button className={styles.btn} color="inherit" onClick={openPopUp} disabled={!company.id}>
              Login
            </Button>
            <IconButton color="inherit" onClick={informationsPage}>
              <InfoOutlinedIcon />
            </IconButton>
          </>
        ) : (
          <Button color="secondary" onClick={logOut} disabled={!company.id}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    user: state.user,
    company: state.company,
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  ...bindActionCreators(
    {
      ...userInteractors,
      ...modalInteractors,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
