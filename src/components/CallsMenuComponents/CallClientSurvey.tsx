import React, { FC, useState } from 'react';
import { useStyles } from '../../styles/ClientSurveyStyles';
import callServices from '../../services/callServices';
import Rating from '@material-ui/lab/Rating';
import * as connectionInteractors from '../../redux/interactors/connectionInteractors';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { AccordionActions, Modal, Typography, Backdrop, Fade, Divider, Button, Box } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface DispatchProps {
  setCallStateFalseInteractor: typeof connectionInteractors.setCallStateFalseInteractor;
}

interface Props extends DispatchProps {
  callId: string;
  sendSurvey: () => void;
}

const DisplaySurvey: FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { callId } = props;
  const [reply1, setReply1] = useState<any>();
  const [reply2, setReply2] = useState<any>();
  const [reply3, setReply3] = useState<any>();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = (): void => {
    setReply1(null);
    setReply2(null);
    setReply3(null);
    props.setCallStateFalseInteractor();
    handleClose();
  };

  const fieldsVerified: boolean =
    typeof reply1 !== 'undefined' && typeof reply2 !== 'undefined' && typeof reply3 !== 'undefined';

  const handleRating = async (): Promise<void> => {
    const ratingValue: number = reply1 * 0.4 + reply2 * 0.25 + reply3 * 0.35;
    await callServices.addRating(ratingValue, callId);
    props.setCallStateFalseInteractor();
    handleCancel();
    handleClose();
    props.sendSurvey();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Tell us your experience!</h2>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">Was the assistant able to solve all your doubts?</Typography>
              <Rating
                name="question-one"
                defaultValue={0.5}
                precision={0.5}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                onChange={(event, newValue) => {
                  setReply1(newValue);
                }}
              />
            </Box>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">Was the assistant´s disposition adequate?</Typography>
              <Rating
                name="question-two"
                defaultValue={0.5}
                precision={0.5}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                onChange={(event, newValue) => {
                  setReply2(newValue);
                }}
              />
            </Box>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">The response time to the video call was..</Typography>
              <Rating
                name="question-three"
                defaultValue={0.5}
                precision={0.5}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                onChange={(event, newValue) => {
                  setReply3(newValue);
                }}
              />
            </Box>
            <Divider />
            <AccordionActions>
              <Button onClick={() => handleCancel()}>No thanks</Button>
              <Button color="primary" disabled={!fieldsVerified} onClick={handleRating}>
                Done
              </Button>
            </AccordionActions>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  ...bindActionCreators(
    {
      ...connectionInteractors,
    },
    dispatch,
  ),
});

export default connect(null, mapDispatchToProps)(DisplaySurvey);
