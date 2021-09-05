import React, { FC, useState } from 'react';
import useStyles from '../styles/AccordionMenuStyles';
import CreateSingleProductAccordionRow from '../components/CatalogueMenu/ProductRegister';
import CreateProductsCSV from '../components/CatalogueMenu/ProductRegisterCSV';
import DeleteProduct from '../components/CatalogueMenu/ProductDelete';
import EditProducts from '../components/CatalogueMenu/ProductsEdit';
import { Button } from '@material-ui/core';
import '../styles/css/catalogueMenu.scss';
import { useHistory } from 'react-router-dom';

const CatalogueMenu: FC = () => {
  const history = useHistory();
  const styles = useStyles();
  const [expanded, setExpanded] = useState<string | false>(false);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <CreateSingleProductAccordionRow
          expanded={expanded}
          handleChange={handleChange}
          panel={'panel1'}
          heading={'Create Single Product'}
          summary={'Here you can create a product for this shop, giving it all its necesary attributes.'}
        />
        <CreateProductsCSV />
        <DeleteProduct
          expanded={expanded}
          handleChange={handleChange}
          panel={'panel2'}
          heading={'Delete Product'}
          summary={'Here you can delete a product from this shop.'}
        />
        <EditProducts />
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

export default CatalogueMenu;
