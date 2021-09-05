/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
interface Params {
  id: string;
  firestore: any;
  shopId: string;
  peerConnection: RTCPeerConnection;
  // setCalling: any;
  setIsOnCall: any;
}

const beginCall = async ({ id, firestore, shopId, peerConnection, setIsOnCall }: Params): Promise<string> => {
  // Create document with two sub collections in the current shop with shopId
  const callsDocument = firestore.collection('shopCalls').doc(shopId).collection('calls').doc(id);
  const offerCandidates = callsDocument?.collection('offerCandidates');
  const answerCandidates = callsDocument?.collection('answerCandidates');
  // setCalling(true);
  setIsOnCall(true);

  // Get candidates for caller, save to db
  peerConnection.onicecandidate = (event: any) => {
    event.candidate && offerCandidates.add(event.candidate.toJSON());
  };

  // Create call offer with offer and status
  const offerDescription = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offerDescription);
  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  };
  const status = {
    answered: false,
    inProgress: true,
    date: new Date(),
  };
  // Set peer offer
  await callsDocument.set({ offer, status });
  // Update status to in progress call
  // await callsDocument.update({ status });

  // Listen for remote answer
  callsDocument.onSnapshot((snapshot: any) => {
    const data = snapshot.data();
    if (!peerConnection.currentRemoteDescription && data?.answer) {
      const answerDescription = new RTCSessionDescription(data.answer);
      peerConnection.setRemoteDescription(answerDescription);
    }
  });

  // When answered, add candidate to peer connection
  answerCandidates.onSnapshot((snapshot: any) => {
    snapshot.docChanges().forEach((change: any) => {
      if (change.type === 'added') {
        const candidate = new RTCIceCandidate(change.doc.data());
        peerConnection.addIceCandidate(candidate);
        // setCalling(false);
      }
    });
  });

  return callsDocument.id;
};

export default beginCall;
