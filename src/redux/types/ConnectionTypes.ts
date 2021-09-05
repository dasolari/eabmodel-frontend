import firebase from 'firebase/app';

export interface ConnectionState {
  firestore: firebase.firestore.Firestore;
  storage: firebase.storage.Storage;
  peerConnection: RTCPeerConnection;
  localStream: any;
  remoteStream: any;
  hangup: boolean;
}

export interface CallPostFields {
  employeeId: string;
  shopId: string;
  rating: number | null;
  date: Date;
}
