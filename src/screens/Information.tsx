import React, { FC } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PopUpState } from '../redux/types/ModalTypes';
import { RootState } from '../redux/store';
import * as modalInteractors from '../redux/interactors/modalInteractors';
import { useStyles } from '../styles/InformationStyles';
import Login from '../components/NavbarComponents/UserLogin';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import '../styles/css/catalogueMenu.scss';

interface StateProps {
  modal: PopUpState;
}

interface DispatchProps {
  closePopUpInteractor: typeof modalInteractors.showPopUpInteractor;
}
interface Props extends StateProps, DispatchProps {}

function getSteps() {
  return ['Product catalog', 'Request assistance', 'Assistants available', 'No assistants available'];
}

function getStepContent(step: any) {
  switch (step) {
    case 0:
      return `In the store you can see the available catalog of the products for sale, in each of the devices.`;
    case 1:
      return `If the customer requires assistance to learn more about a product,  
              he/she should click on "Details" of the product and then at the  
              bottom of the screen click on the "Get assistance" button.`;
    case 2:
      return `If assistants are available, a message will be displayed telling the customer
              to go to the assistance tablet in the store. From here, a video call can be 
              made to an assistant who will help the customer with all his questions.`;
    case 3:
      return `In case there are no assistants available, a message will be displayed 
              informing the client and then, if he/she wishes, he/she can leave his/her 
              e-mail so that an assistant can contact him/her later.`;
  }
}

const VerticalLinearStepper: FC<Props> = (props: Props) => {
  const { modal } = props;
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const closeModal = (): void => {
    props.closePopUpInteractor();
  };

  return (
    <>
      <div className={classes.root}>
        <Typography variant="h3" gutterBottom>
          Operation of the platform
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Virual Assistant is a platform that offers assistance and helps customers with the purchase process virtually,
          through a video call. This allows that in times of pandemic our customers can buy in a safe and informed way,
          covering all the doubts that may arise. Here you can find information on the steps that the customer must
          follow.
        </Typography>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <div className={classes.textContainer}>
                  <Typography className={classes.text}>{getStepContent(index)}</Typography>
                </div>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>Now you are ready to use Virtual Assistance!</Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
        {modal.open && <Login closePopUp={closeModal} />}
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

const mapStateToProps = (state: RootState): StateProps => {
  return {
    modal: state.modal,
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  ...bindActionCreators(
    {
      ...modalInteractors,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(VerticalLinearStepper);
