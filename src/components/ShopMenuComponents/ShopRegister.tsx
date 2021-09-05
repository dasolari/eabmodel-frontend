import React, { FC, useState, useEffect } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DissmisibleSuccessAlert from '../GeneralUseComponents/DissmissibleSuccessAlert';
import useStyles from '../../styles/AccordionMenuStyles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import { CompanyState } from '../../redux/types/CompanyTypes';
import { ShopState, PostShopFields } from '../../redux/types/ShopTypes';
import * as shopInteractors from '../../redux/interactors/shopInteractors';
import verifyString from '../../utils/globalHelpers/verifyString';
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

interface StateProps {
  company: CompanyState;
  shop: ShopState;
}

interface DispatchProps {
  addShopInteractor: typeof shopInteractors.addShopInteractor;
}

interface Props extends StateProps, DispatchProps {
  expanded: string | false;
  handleChange: (panel: string) => any;
  panel: string;
  heading: string;
  summary: string;
}

const CreateShop: FC<Props> = (props: Props) => {
  const { expanded, handleChange, panel, heading, summary, company, shop, addShopInteractor } = props;
  const [shopName, setShopName] = useState('');
  const [shopLocation, setShopLocation] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const styles = useStyles();

  useEffect(() => {
    if (shop.addShopStatus.success) {
      setShowSuccessMessage(true);
    }
  }, [shop.addShopStatus, setShowSuccessMessage]);

  const handleCancelCreate = (): void => {
    setShopName('');
    setShopLocation('');
  };

  const handleCreate = (): void => {
    const shopAuthFields: PostShopFields = {
      companyId: company.id,
      name: shopName,
      location: shopLocation,
    };
    addShopInteractor(shopAuthFields);
    // Called to reset the state
    handleCancelCreate();
  };

  return (
    <Accordion TransitionProps={{ unmountOnExit: true }} expanded={expanded === panel} onChange={handleChange(panel)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
        <Typography className={styles.heading}>{heading}</Typography>
        <Typography className={styles.secondaryHeading}>{summary}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          value={shopName}
          variant="standard"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          onChange={(event) => setShopName(event.target.value)}
        />
      </AccordionDetails>
      <AccordionDetails>
        <TextField
          value={shopLocation}
          variant="standard"
          required
          fullWidth
          id="location"
          label="Location"
          name="location"
          onChange={(event) => setShopLocation(event.target.value)}
        />
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Button size="small" onClick={() => handleCancelCreate()}>
          Cancel
        </Button>
        <Button
          size="small"
          color="primary"
          disabled={!(verifyString(shopName) && verifyString(shopLocation))}
          onClick={handleCreate}>
          Create Shop
        </Button>
      </AccordionActions>
      {shop.addShopStatus.loading && <LinearProgress />}
      {showSuccessMessage && (
        <DissmisibleSuccessAlert
          message={'Shop successfully created, you can close this menu now.'}
          openedStateInParent={setShowSuccessMessage}
        />
      )}
    </Accordion>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    company: state.company,
    shop: state.shop,
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  ...bindActionCreators(
    {
      ...shopInteractors,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateShop);
