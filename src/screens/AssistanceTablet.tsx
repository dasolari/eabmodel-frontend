import React, { FC, useState, useEffect } from 'react';
import { RootState } from '../redux/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ConnectionState } from '../redux/types/ConnectionTypes';
import * as connectionInteractors from '../redux/interactors/connectionInteractors';
import CustomerCall from '../components/AssistanceTabletComponents/CustomerCall';
import { Typography } from '@material-ui/core';

interface StateProps {
  connection: ConnectionState;
  shopId: string;
}

interface DispatchProps {
  setLocalStreamInteractor: typeof connectionInteractors.setLocalStreamInteractor;
  setRemoteStreamInteractor: typeof connectionInteractors.setRemoteStreamInteractor;
  resetStreamConnectionInteractor: typeof connectionInteractors.resetStreamConnectionInteractor;
}

interface Props extends StateProps, DispatchProps {}

const AssistanceTablet: FC<Props> = (props: Props) => {
  const { firestore } = props.connection;
  const [currentCall, setCurrentCall] = useState<string>('');
  const [activeCall, setActiveCall] = useState(false);

  const hangupCall = () => {
    setCurrentCall('');
    setActiveCall(false);
  };

  // Listen to any additions or deletions to the database
  useEffect(() => {
    console.log('This it a test console log to prevent firestore excessive requests...');
    const unsubscribe = firestore
      .collection('shopCalls')
      .doc(props.shopId)
      .collection('calls')
      .onSnapshot((snapshot) => {
        // If there are changes in the current waiting calls
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            if (!change.doc.data().status.inProgress && !currentCall) {
              setCurrentCall(change.doc.id);
              setActiveCall(true);
            }
          }
          if (change.type === 'removed') {
            window.location.reload();
          }
        });
      });
    return () => {
      unsubscribe();
    };
  }, [firestore]);

  return (
    <>
      <Typography component="h1" variant="h3">
        Assistance Tablet
      </Typography>
      {activeCall && <CustomerCall shopId={props.shopId} currentCallId={currentCall} hangupCall={hangupCall} />}
    </>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    connection: state.connection,
    shopId: state.shop.id,
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  ...bindActionCreators(
    {
      ...connectionInteractors,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssistanceTablet);
