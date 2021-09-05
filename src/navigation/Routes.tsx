import React, { FC, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { RootState } from '../redux/store';
import { UserState } from '../redux/types/UserTypes';
import Home from '../screens/Home';
import Information from '../screens/Information';
import NavBar from './NavBar';
import { useSelector } from 'react-redux';
import CompanyAuth from '../screens/CompanyAuth';
import AdministrationPortal from '../screens/AdministrationPortal';
import CallsMenu from '../screens/CallsMenu';
import CatalogueMenu from '../screens/CatalogueMenu';
import EmployeesMenu from '../screens/EmployeesMenu';
import ShopMenu from '../screens/ShopMenu';
import ShopDevices from '../screens/ShopDevices';
import ProductDetails from '../screens/ProductDetails';
import PreCallScreen from '../screens/PreCallScreen';
import AssistanceTablet from '../screens/AssistanceTablet';
import { IconButton, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import '../styles/css/layout.scss';
import SidebarOptions from './SidebarOptions';
import SuccessHandler from '../components/GeneralUseComponents/Successes/SuccessHandler';
import ErrorHandler from '../components/GeneralUseComponents/Errors/ErrorHandler';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
}));

// eslint-disable-next-line react/prop-types
const EmployeeRoute: FC<any> = ({ component: Component, ...rest }) => {
  const user = useSelector<RootState, UserState>((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) => (user.sessionType !== 'ANONYMOUS' ? <Component {...props} /> : <Redirect to="/home" />)}
    />
  );
};

// eslint-disable-next-line react/prop-types
const AdministratorRoute: FC<any> = ({ component: Component, ...rest }) => {
  const user = useSelector<RootState, UserState>((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        user.sessionType === 'ADMINISTRATOR' ? <Component {...props} /> : <Redirect to="/administration" />
      }
    />
  );
};

const Routes: FC = () => {
  const styles = useStyles();
  const [leftOpen, setLeftOpen] = useState(false);
  const [isOpen, setOpen] = useState(leftOpen ? 'open' : 'closed');
  const toggleSidebar = () => {
    setLeftOpen(!leftOpen);
    setOpen(leftOpen ? 'open' : 'closed');
  };
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div id="layout">
        <div id="left" className={isOpen}>
          <IconButton
            edge="start"
            className={`icon ${styles.menuButton}`}
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
          <div className={`sidebar ${isOpen}`}>
            <div className="content">
              <SidebarOptions />
            </div>
          </div>
        </div>
        <div id="main">
          <div className="header">
            <div
              className={`
                          title
                          ${'left-' + isOpen}
                      `}>
              <NavBar />
            </div>
          </div>
          <div className="content" id="page">
            <ErrorHandler time={4000} margin={1000} />
            <SuccessHandler time={4000} margin={1000} />
            <Switch>
              <Route path="/" exact component={CompanyAuth} />
              <Route path="/home" exact component={Home} />
              <Route path="/home/call" exact component={PreCallScreen} />
              <Route path="/information" exact component={Information} />
              <Route path="/product/:id/details" exact component={ProductDetails} />
              <Route path="/assistance" exact component={AssistanceTablet} />
              <EmployeeRoute path="/administration" exact component={AdministrationPortal} />
              <EmployeeRoute path="/administration/calls" exact component={CallsMenu} />
              <AdministratorRoute path="/administration/shop" exact component={ShopMenu} />
              <AdministratorRoute path="/administration/shop/:id" exact component={ShopDevices} />
              <AdministratorRoute path="/administration/catalogue" exact component={CatalogueMenu} />
              <AdministratorRoute path="/administration/employees" exact component={EmployeesMenu} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Routes;
