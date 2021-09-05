import { Button } from '@material-ui/core';
import React, { FC, useState } from 'react';
import CompanyUsers from '../components/EmployeesMenu/CompanyUsers';
import CreateUser from '../components/EmployeesMenu/UserRegister';
import useStyles from '../styles/AccordionMenuStyles';

const EmployeesMenu: FC = () => {
  const styles = useStyles();
  const [expanded, setExpanded] = useState<string | false>(false);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <CreateUser
          expanded={expanded}
          handleChange={handleChange}
          panel={'panel1'}
          heading={'Create Single User'}
          summary={'Here you can create a user for this shop, giving it all its necesary attributes.'}
        />
        <CompanyUsers />
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

export default EmployeesMenu;
