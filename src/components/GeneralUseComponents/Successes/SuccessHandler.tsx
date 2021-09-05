import React, { FC, memo } from 'react';
import PropTypes from 'prop-types';
import CompanySuccess from './CompanySuccess';
import CatalogueSuccess from './CatalogueSuccess';
import ShopSuccess from './ShopSuccess';
import UserSuccess from './UserSuccess';
import '../../../styles/css/generalUseStyles.scss';

interface Props {
  time: number;
  margin: number;
}

const SuccessHandler: FC<Props> = ({ time, margin }) => {
  return (
    <div className="message-alert-container">
      <CompanySuccess time={time} margin={margin} />
      <CatalogueSuccess time={time} margin={margin} />
      <ShopSuccess time={time} margin={margin} />
      <UserSuccess time={time} margin={margin} />
    </div>
  );
};

SuccessHandler.propTypes = {
  time: PropTypes.number.isRequired,
  margin: PropTypes.number.isRequired,
};

export default memo(SuccessHandler);
