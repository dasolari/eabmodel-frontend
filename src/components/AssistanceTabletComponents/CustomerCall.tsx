import React, { FC, useState, useEffect, useRef } from 'react';
import { RootState } from '../../redux/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from '@material-ui/core';
import { ConnectionState } from '../../redux/types/ConnectionTypes';
import * as connectionInteractors from '../../redux/interactors/connectionInteractors';
import setSources from '../../utils/videoHelpers/setMediaSources';
import beginCall from '../../utils/videoHelpers/beginCall';
import '../../styles/css/calls.scss';

interface StateProps {
  connection: ConnectionState;
}

interface DispatchProps {
  setLocalStreamInteractor: typeof connectionInteractors.setLocalStreamInteractor;
  setRemoteStreamInteractor: typeof connectionInteractors.setRemoteStreamInteractor;
  resetStreamConnectionInteractor: typeof connectionInteractors.resetStreamConnectionInteractor;
}

interface Props extends StateProps, DispatchProps {
  shopId: string;
  currentCallId: string;
  hangupCall: any;
}

const CustomerCall: FC<Props> = (props: Props) => {
  const { firestore, peerConnection } = props.connection;
  const webcamVideo = useRef<any>();
  const remoteVideo = useRef<any>();
  const [isOnCall, setIsOnCall] = useState(false);
  let callInput = useRef<string>().current;

  const startCall = async (id: string) => {
    callInput = await beginCall({ id, firestore, shopId: props.shopId, peerConnection, setIsOnCall });
  };

  const hangupCall = async () => {
    setIsOnCall(false);
    try {
      // Deleting collections is not recommended from web client, find alternative later
      await firestore.collection('shopCalls').doc(props.shopId).collection('calls').doc(callInput).delete();
    } catch (error) {
      console.log(error);
    } finally {
      props.hangupCall();
    }
  };

  // On first render, set all necesary video call requirements
  useEffect(() => {
    const data = {
      peerConnection,
      webcamVideo: webcamVideo.current,
      remoteVideo: remoteVideo.current,
    };
    setSources(data)
      .then(({ localStream, remoteStream }) => {
        props.setLocalStreamInteractor(localStream);
        props.setRemoteStreamInteractor(remoteStream);
      })
      .then(() => startCall(props.currentCallId));
    // Cleanup
    return () => {
      if (webcamVideo.current && remoteVideo.current) {
        webcamVideo.current.srcObject = null;
        remoteVideo.current.srcObject = null;
      }
      props.resetStreamConnectionInteractor();
    };
  }, [isOnCall]);

  return (
    <>
      <h1>Getting Assistance</h1>
      <div className="customer-call-container">
        <div className="customer-main-container">
          <video className="local-video-container" ref={webcamVideo} autoPlay playsInline muted></video>
          <video className="remote-video-container" ref={remoteVideo} autoPlay playsInline></video>
          <div className="customer-button-container">
            <Button size="small" variant="contained" color="secondary" disabled={!isOnCall} onClick={hangupCall}>
              Hang up
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    connection: state.connection,
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerCall);
