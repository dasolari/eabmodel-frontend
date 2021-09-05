import React, { FC, useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DissmisibleSuccessAlert from '../GeneralUseComponents/DissmissibleSuccessAlert';
import useStyles from '../../styles/AccordionMenuStyles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import { ShopState } from '../../redux/types/ShopTypes';
import * as shopInteractors from '../../redux/interactors/shopInteractors';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Divider,
  AccordionActions,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
} from '@material-ui/core';

interface StateProps {
  shop: ShopState;
}

interface DispatchProps {
  setShopInteractor: typeof shopInteractors.setShopInteractor;
}

interface Props extends StateProps, DispatchProps {
  expanded: string | false;
  handleChange: (panel: string) => any;
  panel: string;
  heading: string;
  summary: string;
}

const SwitchShop: FC<Props> = (props: Props) => {
  const { expanded, handleChange, panel, heading, summary, shop, setShopInteractor } = props;
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [value, setValue] = useState(shop?.id);
  const [toSwitchShop, setToSwitchShop] = useState<any>();
  const styles = useStyles();

  const handleShopChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const shopId = event.target.value;
    setValue(shopId);
    const foundShop = shop.shops.find((elem) => elem.id === shopId);
    setToSwitchShop(foundShop);
  };

  const handleSubmit = (): void => {
    setShopInteractor(toSwitchShop);
    setShowSuccessMessage(true);
  };

  return (
    <Accordion TransitionProps={{ unmountOnExit: true }} expanded={expanded === panel} onChange={handleChange(panel)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
        <Typography className={styles.heading}>{heading}</Typography>
        <Typography className={styles.secondaryHeading}>{summary}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl component="fieldset">
          <RadioGroup aria-label="shop" name="shopChoice" value={value} onChange={handleShopChange}>
            {shop.shops?.map((elem) => (
              <FormControlLabel key={elem.id} value={elem.id} control={<Radio />} label={elem.name} />
            ))}
          </RadioGroup>
        </FormControl>
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Button size="small" color="primary" disabled={shop.id === value} onClick={handleSubmit}>
          Switch Shop
        </Button>
      </AccordionActions>
      {showSuccessMessage && (
        <DissmisibleSuccessAlert
          message={'Switched shop successfully, you can close this menu now.'}
          openedStateInParent={setShowSuccessMessage}
        />
      )}
    </Accordion>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(SwitchShop);
