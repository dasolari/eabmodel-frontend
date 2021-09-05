import React, { FC, useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { RootState } from '../redux/store';
import { connect } from 'react-redux';
import { ConnectionState, CallPostFields } from '../redux/types/ConnectionTypes';
import DisplaySurvey from '../components/CallsMenuComponents/CallClientSurvey';
import callServices from '../services/callServices';
import '../styles/css/calls.scss';

interface StateProps {
  connection: ConnectionState;
  shopId: string;
  userId: string;
}

interface Props extends StateProps {
  // extra props you want to add
}

const CustomerVideoChat: FC<Props> = (props: Props) => {
  const history = useHistory();
  const { firestore } = props.connection;
  const [stateCallId, setStateCallId] = useState<any>(null);
  const [surveyShowing, setSurveyShowing] = useState(false);
  let callId = useRef<any>(undefined).current;

  const showSurvey = () => {
    setSurveyShowing(true);
  };

  const sendSurvey = () => {
    callId = null;
    setSurveyShowing(false);
    history.go(-1);
  };

  useEffect(() => {
    console.log('This it a test console log to prevent firestore excessive requests...');
    firestore.collection('shopCalls').doc(props.shopId).set({ updatedAt: new Date() });
    const status = {
      answered: false,
      inProgress: false,
      date: new Date(),
    };
    // Se crea llamada en backend
    createCall().then((response) => {
      firestore.collection('shopCalls').doc(props.shopId).collection('calls').doc(response.id).set({ status });
      callId = response.id;
      setStateCallId(callId);
    });
  }, []);

  // Listen to any additions or deletions to the database
  useEffect(() => {
    console.log('This it a test console log to prevent firestore excessive requests...');
    const unsubscribe = firestore
      .collection('shopCalls')
      .doc(props.shopId)
      .collection('calls')
      .onSnapshot((snapshot) => {
        // If call is finished display survey
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'removed' && change.doc.id === callId) {
            showSurvey();
          }
        });
      });
    return () => {
      unsubscribe();
    };
  }, [firestore]);

  const createCall = async (): Promise<any> => {
    const callAuthFields: CallPostFields = {
      employeeId: props.userId,
      shopId: props.shopId,
      rating: null,
      date: new Date(),
    };
    const response = await callServices.postCallRegister(callAuthFields);
    return response;
  };

  if (surveyShowing) {
    return <DisplaySurvey callId={stateCallId} sendSurvey={sendSurvey} />;
  }

  return (
    <div className="go-to-tablet-screen">
      <h1>An assistant will take care of you</h1>
      <p>Please, go to the nearest assistance tablet 😁</p>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    connection: state.connection,
    shopId: state.shop.id,
    userId: state.user.id,
  };
};

export default connect(mapStateToProps)(CustomerVideoChat);
