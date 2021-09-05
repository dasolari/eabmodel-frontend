import React, { FC, memo } from 'react';
import PropTypes from 'prop-types';
import CompanyError from './CompanyError';
import CatalogueError from './CatalogueError';
import ShopError from './ShopError';
import UserError from './UserError';
import '../../../styles/css/generalUseStyles.scss';

interface Props {
  time: number;
  margin: number;
}

const ErrorHandler: FC<Props> = ({ time, margin }) => {
  return (
    <div className="message-alert-container">
      <CompanyError time={time} margin={margin} />
      <CatalogueError time={time} margin={margin} />
      <ShopError time={time} margin={margin} />
      <UserError time={time} margin={margin} />
    </div>
  );
};

ErrorHandler.propTypes = {
  time: PropTypes.number.isRequired,
  margin: PropTypes.number.isRequired,
};

export default memo(ErrorHandler);
