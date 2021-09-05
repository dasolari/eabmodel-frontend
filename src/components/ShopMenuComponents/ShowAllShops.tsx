import React, { FC } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from '../../styles/AccordionMenuStyles';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import { ShopState } from '../../redux/types/ShopTypes';
import ShopItem from './ShopItem';
import { Accordion, AccordionSummary, Divider, List, Typography } from '@material-ui/core';

interface StateProps {
  shop: ShopState;
}

interface Props extends StateProps {
  expanded: string | false;
  handleChange: (panel: string) => any;
  panel: string;
  heading: string;
  summary: string;
}

const ShowAllShops: FC<Props> = (props: Props) => {
  const { expanded, handleChange, panel, heading, summary, shop } = props;
  const styles = useStyles();

  return (
    <Accordion TransitionProps={{ unmountOnExit: true }} expanded={expanded === panel} onChange={handleChange(panel)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
        <Typography className={styles.heading}>{heading}</Typography>
        <Typography className={styles.secondaryHeading}>{summary}</Typography>
      </AccordionSummary>
      <Divider />
      <List dense>
        {shop.shops.map((shop) => (
          <ShopItem key={shop.id} shop={shop} />
        ))}
      </List>
    </Accordion>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    shop: state.shop,
  };
};

export default connect(mapStateToProps)(ShowAllShops);
