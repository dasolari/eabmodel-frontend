import { createSlice } from '@reduxjs/toolkit';
import { ConnectionState } from '../types/ConnectionTypes';
import { firestore, storage } from '../../services/firebase/config';
import peerConnection from '../../services/webRTC/config';

const initialState: ConnectionState = {
  firestore,
  storage,
  peerConnection,
  localStream: null,
  remoteStream: null,
  hangup: false,
};

const connection = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    addLocalStream: (state: ConnectionState, action) => {
      return {
        ...state,
        localStream: action.payload,
      };
    },
    removeLocalStream: (state: ConnectionState) => {
      return {
        ...state,
        localStream: initialState.localStream,
      };
    },
    addRemoteStream: (state: ConnectionState, action) => {
      return {
        ...state,
        remoteStream: action.payload,
      };
    },
    removeRemoteStream: (state: ConnectionState) => {
      return {
        ...state,
        remoteStream: initialState.remoteStream,
      };
    },
    resetStreamConnection: (state: ConnectionState) => {
      return {
        ...state,
        peerConnection: initialState.peerConnection,
        localStream: initialState.localStream,
        remoteStream: initialState.remoteStream,
      };
    },
    setCallStateTrue: (state: ConnectionState) => {
      return {
        ...state,
        hangup: true,
      };
    },
    setCallStateFalse: (state: ConnectionState) => {
      return {
        ...state,
        hangup: false,
      };
    },
  },
});

export const connectionReducer = connection.reducer;
export const connectionActions = connection.actions;
