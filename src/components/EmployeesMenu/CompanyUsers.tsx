import React, { FC, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as companyInteractors from '../../redux/interactors/companyInteractors';
import { CompanyState } from '../../redux/types/CompanyTypes';
import { RootState } from '../../redux/store';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import '../../styles/css/employeesMenu.scss';
import CompanyUserRow from './CompanyUserRow';
import { UserState } from '../../redux/types/UserTypes';

interface StateProps {
  company: CompanyState;
  user: UserState;
}

interface DispatchProps {
  getCompanyUsersInteractor: typeof companyInteractors.getCompanyUsersInteractor;
  getCompanyShopsInteractor: typeof companyInteractors.getCompanyShopsInteractor;
}

interface Props extends StateProps, DispatchProps {}

const CompanyUsers: FC<Props> = (props: Props) => {
  const { company, user, getCompanyUsersInteractor, getCompanyShopsInteractor } = props;

  useEffect(() => {
    getCompanyUsersInteractor(company.id);
  }, [getCompanyUsersInteractor, user.registerUserStatus]);

  useEffect(() => {
    getCompanyShopsInteractor(company.id);
  }, [getCompanyShopsInteractor]);

  return (
    <Paper>
      <div>
        <h1>Company&apos;s Employees</h1>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="center">Shop</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {company.users.map((row) => (
                <CompanyUserRow key={row.id} data={row} shops={company?.shops} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Paper>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    company: state.company,
    user: state.user,
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

export default connect(mapStateToProps, mapDispatchToProps)(CompanyUsers);
