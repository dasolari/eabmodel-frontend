import React, { FC, useState, useEffect } from 'react';
// import { AxiosResponse } from 'axios';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DissmisibleSuccessAlert from '../GeneralUseComponents/DissmissibleSuccessAlert';
import useStyles from '../../styles/AccordionMenuStyles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import { ShopState } from '../../redux/types/ShopTypes';
import { ConnectionState } from '../../redux/types/ConnectionTypes';
import { CatalogueState, ProductPutFields, Product } from '../../redux/types/CatalogueTypes';
import * as catalogueInteractors from '../../redux/interactors/catalogueInteractors';
import verifyString from '../../utils/globalHelpers/verifyString';
import AddIcon from '@material-ui/icons/Add';
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
  Fab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

interface StateProps {
  shop: ShopState;
  catalogue: CatalogueState;
  connection: ConnectionState;
}

interface DispatchProps {
  editProductFromCatalogueInteractor: typeof catalogueInteractors.editProductFromCatalogueInteractor;
  resetCatalogueInteractor: typeof catalogueInteractors.resetCatalogueInteractor;
  getCatalogueInteractor: typeof catalogueInteractors.getCatalogueInteractor;
}

interface Props extends StateProps, DispatchProps {
  panel: string;
  heading: string;
  summary: string;
  product: Product;
}

const EditProduct: FC<Props> = (props: Props) => {
  const { panel, heading, summary, shop, catalogue, product } = props;
  const [expanded, setExpanded] = useState<string | false>(false);
  const [name, setName] = useState(product.name);
  const [brand, setBrand] = useState(product.brand);
  const [os, setOS] = useState(product.os);
  const [color, setColor] = useState(product.color);
  const [inches, setInches] = useState(product.inches.toString());
  const [price, setPrice] = useState(product.price.toString());
  const [image, setImage] = useState(product.image);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const styles = useStyles();

  useEffect(() => {
    if (catalogue.editProductFromCatalogueStatus.success) {
      setShowSuccessMessage(true);
    }
  }, [catalogue.editProductFromCatalogueStatus, setShowSuccessMessage]);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleCancelEdit = (): void => {
    setName(product.name);
    setBrand(product.brand);
    setOS(product.os);
    setColor(product.color);
    setInches(product.inches.toString());
    setPrice(product.price.toString());
    setImage(product.image);
  };

  const handleEdit = (): void => {
    const productAuthFields: ProductPutFields = {
      id: product.id,
      shopId: shop.id,
      name,
      brand,
      os,
      color,
      inches: Number(inches),
      price: Number(price),
      image,
    };
    props.editProductFromCatalogueInteractor(productAuthFields);
  };

  const onFileChange = async (event: any) => {
    const file = event.target.files[0];
    const storageRef: any = await props.connection.storage.ref(`${shop.id}/${file.name}`);
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    const url = await fileRef.getDownloadURL();
    setImage(url);
  };

  const fieldsVerified: boolean =
    verifyString(name) &&
    verifyString(brand) &&
    verifyString(os) &&
    verifyString(color) &&
    verifyString(inches) &&
    verifyString(image) &&
    verifyString(price);

  return (
    <Accordion TransitionProps={{ unmountOnExit: true }} expanded={expanded === panel} onChange={handleChange(panel)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
        <Typography className={styles.heading}>{heading}</Typography>
        <Typography className={styles.secondaryHeading}>{summary}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          value={name}
          variant="standard"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          onChange={(event) => setName(event.target.value)}
        />
      </AccordionDetails>
      <AccordionDetails>
        <TextField
          value={brand}
          variant="standard"
          required
          fullWidth
          id="brand"
          label="Brand"
          name="brand"
          onChange={(event) => setBrand(event.target.value)}
        />
      </AccordionDetails>
      <AccordionDetails>
        <FormControl variant="outlined" className={styles.formControl} fullWidth>
          <InputLabel id="demo-simple-select-outlined-label">OS</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={os}
            onChange={(event: any) => setOS(event.target.value)}
            label="Age">
            <MenuItem value={'Android'}>Android</MenuItem>
            <MenuItem value={'IOS'}>IOS</MenuItem>
            <MenuItem value={'Windows'}>Windows</MenuItem>
          </Select>
        </FormControl>
      </AccordionDetails>
      <AccordionDetails>
        <TextField
          value={color}
          variant="standard"
          required
          fullWidth
          id="color"
          label="Device Color"
          name="color"
          onChange={(event) => setColor(event.target.value)}
        />
      </AccordionDetails>
      <AccordionDetails>
        <TextField
          value={inches}
          variant="standard"
          type="number"
          required
          fullWidth
          id="inches"
          label="Inches"
          name="inches"
          onChange={(event) => setInches(event.target.value)}
        />
      </AccordionDetails>
      <AccordionDetails>
        <TextField
          value={price}
          variant="standard"
          type="number"
          required
          fullWidth
          id="price"
          label="Price"
          name="price"
          onChange={(event) => setPrice(event.target.value)}
        />
      </AccordionDetails>
      <AccordionDetails>
        <label htmlFor="upload-photo">
          <input
            style={{ display: 'none' }}
            id="upload-photo"
            name="upload-photo"
            type="file"
            onChange={onFileChange}
          />
          <Fab color="primary" size="small" component="span" aria-label="add" variant="extended">
            <AddIcon /> Upload photo
          </Fab>
        </label>
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Button size="small" onClick={handleCancelEdit}>
          Cancel
        </Button>
        <Button size="small" color="primary" disabled={!fieldsVerified} onClick={handleEdit}>
          Edit Product
        </Button>
      </AccordionActions>
      {catalogue.editProductFromCatalogueStatus.loading && <LinearProgress />}
      {showSuccessMessage && (
        <DissmisibleSuccessAlert
          message={'Product successfully edited, you can close this menu now.'}
          openedStateInParent={setShowSuccessMessage}
        />
      )}
    </Accordion>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    shop: state.shop,
    catalogue: state.catalogue,
    connection: state.connection,
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
