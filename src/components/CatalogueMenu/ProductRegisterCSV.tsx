import React, { FC, useEffect, useState } from 'react';
import { CatalogueState } from '../../redux/types/CatalogueTypes';
import { ShopState } from '../../redux/types/ShopTypes';
import * as catalogueInteractors from '../../redux/interactors/catalogueInteractors';
import { RootState } from '../../redux/store';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { Fab, LinearProgress, Paper, Typography } from '@material-ui/core';
import { CSVReader } from 'react-papaparse';
import useStyles from '../../styles/AccordionMenuStyles';
import { FaFileCsv } from 'react-icons/fa';
import DissmisibleSuccessAlert from '../GeneralUseComponents/DissmissibleSuccessAlert';

interface StateProps {
  shop: ShopState;
  catalogue: CatalogueState;
}

interface DispatchProps {
  addProductsToCatalogueInteractor: typeof catalogueInteractors.addProductToCatalogueInteractor;
  resetCatalogueInteractor: typeof catalogueInteractors.resetCatalogueInteractor;
}

interface Props extends StateProps, DispatchProps {}

const CreateProductsCSV: FC<Props> = (props: Props) => {
  const styles = useStyles();
  const [csvData, setData] = useState<Array<any> | null>(null);
  const { shop, catalogue } = props;
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState<string>('');

  useEffect(() => {
    if (catalogue.addProductsToCatalogueStatus.success) {
      setShowSuccessMessage(true);
      props.resetCatalogueInteractor();
    }
  }, [catalogue.addProductsToCatalogueStatus, props.resetCatalogueInteractor]);

  const handleOnDrop = (data: any) => {
    setData(data);
  };

  const handleOnError = (err: any) => {
    setShowErrorMessage(`An unexpected error ocurred: ${err}`);
  };

  function isValid(productAuthFields: any): boolean {
    let validated = true;
    Object.values(productAuthFields).forEach((value) => {
      if (value == undefined || value == '') {
        validated = false;
      }
    });
    return validated;
  }

  const handleUpload = (): void => {
    const products: any[] = [];
    csvData?.slice(1).forEach((dataRow: { data: any }) => {
      const productAuthFields: any = {
        shopId: shop.id,
        name: dataRow.data[0],
        brand: dataRow.data[1],
        os: dataRow.data[2],
        color: dataRow.data[3],
        inches: Number(dataRow.data[4]),
        price: Number(dataRow.data[5]),
        image:
          'https://firebasestorage.googleapis.com/v0/b/eabmodel-ff034.appspot.com/o/PhoneGeneric.jpeg?alt=media&token=2fc686b6-295e-4d59-9af0-db8897463b36',
      };
      // TODO: check if it's necessary to check if attributes make sense (like os being part of a valid list)
      if (isValid(productAuthFields)) {
        products.push(productAuthFields);
      }
    });
    props.addProductsToCatalogueInteractor(products);
  };

  return (
    <Paper elevation={1}>
      <div className="flex-container-between">
        <Typography className={styles.heading}>Import Products from CSV</Typography>
        <div className="flex-container-evenly">
          <CSVReader onDrop={handleOnDrop} onError={handleOnError} addRemoveButton>
            <span>Drop CSV file here or click to upload.</span>
          </CSVReader>
          <Fab color="primary" className={styles.fab} onClick={handleUpload}>
            <FaFileCsv style={{ fontSize: 30 }} />
          </Fab>
        </div>
      </div>
      {catalogue.addProductsToCatalogueStatus.loading && <LinearProgress />}
      {showSuccessMessage && (
        <DissmisibleSuccessAlert
          message={'Products successfully created, you can close this menu now.'}
          openedStateInParent={setShowSuccessMessage}
        />
      )}
      {showErrorMessage}
    </Paper>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    shop: state.shop,
    catalogue: state.catalogue,
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  ...bindActionCreators(
    {
      ...catalogueInteractors,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductsCSV);
