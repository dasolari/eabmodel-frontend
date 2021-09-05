import { Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { bindActionCreators } from '@reduxjs/toolkit';
import React, { FC, useEffect, useState } from 'react';
import { RootState } from '../../redux/store';
import * as userInteractors from '../../redux/interactors/userInteractors';
import { connect } from 'react-redux';
import { ShopBackendState } from '../../redux/types/CompanyTypes';
import '../../styles/css/employeesMenu.scss';
import { ReassignUserFields, UserState } from '../../redux/types/UserTypes';
import * as companyInteractors from '../../redux/interactors/companyInteractors';

interface StateProps {
  user: UserState;
}

interface DispatchProps {
  reassignUserShopInteractor: typeof userInteractors.reassignUserShopInteractor;
  handleUserReassignInteractor: typeof companyInteractors.handleUserReassignInteractor;
}

interface Props extends StateProps, DispatchProps {
  defaultId: string;
  shops: ShopBackendState[];
  userId: string;
}

const ReassignShop: FC<Props> = (props: Props) => {
  const { user, shops, defaultId, userId, reassignUserShopInteractor, handleUserReassignInteractor } = props;
  const [selectedShop, setSelectedShop] = useState(defaultId);

  useEffect(() => {
    const request: ReassignUserFields = {
      userId: userId,
      shopId: selectedShop,
    };
    if (user.reassignUserShopStatus.success) {
      handleUserReassignInteractor(request);
    }
  }, [user.reassignUserShopStatus.success]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedShop(event.target.value as string);
  };

  const handleReassign = () => {
    const request: ReassignUserFields = {
      userId: userId,
      shopId: selectedShop,
    };
    reassignUserShopInteractor(request);
    handleUserReassignInteractor(request);
  };

  const menuItems = shops?.map((shop) => {
    return (
      <MenuItem key={shop.id} value={shop.id}>
        {shop.name}
      </MenuItem>
    );
  });

  return (
    <div className="flex-container">
      <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Shop</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={selectedShop}
          onChange={handleChange}
          label="shop">
          {menuItems.map((x) => x)}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleReassign}>
        Reassign
      </Button>
    </div>
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
      ...companyInteractors,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReassignShop);
