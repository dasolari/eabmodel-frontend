import React, { FC, useEffect, useState } from 'react';
import catalogueServices from '../services/catalogueServices';
import { useRowStyles } from '../styles/ShopDevicesStyles';
import {
  Typography,
  Paper,
  Table,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Button,
} from '@material-ui/core';
import '../styles/css/productDetails.scss';
import AccordionItem from '../components/ShopMenuComponents/AccordionItem';

const ShopDevices: FC = () => {
  const shopId = window.location.pathname.split('/')[4];
  const [devices, setDevices] = useState<any[]>([]);
  const classes = useRowStyles();

  useEffect(() => {
    catalogueServices.getShopProducts(shopId).then(setDevices);
  }, []);

  return (
    <>
      <Typography className={classes.title} variant="h4">
        All devices of the shop
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Device name</TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Os</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {devices.map((device, index) => (
              <AccordionItem key={index} device={device} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="btn-bottom-left">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            history.go(-1);
          }}>
          Back
        </Button>
      </div>
    </>
  );
};

export default ShopDevices;
