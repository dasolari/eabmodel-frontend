import React, { FC, useState } from 'react';
import useStyles from '../styles/AccordionMenuStyles';
import CreateShopAccordionRow from '../components/ShopMenuComponents/ShopRegister';
import SwitchShopAccordionRow from '../components/ShopMenuComponents/SwitchShop';
import ViewShopsAccordionRow from '../components/ShopMenuComponents/ShowAllShops';
import { Button } from '@material-ui/core';

const ShopMenu: FC = () => {
  const styles = useStyles();
  const [expanded, setExpanded] = useState<string | false>(false);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <CreateShopAccordionRow
          expanded={expanded}
          handleChange={handleChange}
          panel={'panel1'}
          heading={'Create Shop'}
          summary={'Here you can create a shop, giving all its necesary attributes.'}
        />
        <SwitchShopAccordionRow
          expanded={expanded}
          handleChange={handleChange}
          panel={'panel2'}
          heading={'Switch Shop'}
          summary={'Here you can change to another shop.'}
        />
        <ViewShopsAccordionRow
          expanded={expanded}
          handleChange={handleChange}
          panel={'panel3'}
          heading={'View Shops'}
          summary={'Here you can find all available shops.'}
        />
      </div>
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

export default ShopMenu;
