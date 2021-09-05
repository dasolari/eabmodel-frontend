/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
interface Params {
  firestore: any;
  shopId: string;
  callId: string;
  peerConnection: RTCPeerConnection;
}

const takeCall = async ({ firestore, shopId, callId, peerConnection }: Params) => {
  const callDocument = firestore.collection('shopCalls').doc(shopId).collection('calls').doc(callId);
  const answerCandidates = callDocument.collection('answerCandidates');
  const offerCandidates = callDocument.collection('offerCandidates');

  peerConnection.onicecandidate = (event: any) => {
    event.candidate && answerCandidates.add(event.candidate.toJSON());
  };
  const callData = (await callDocument.get()).data();

  const offerDescription = callData?.offer;
  await peerConnection.setRemoteDescription(new RTCSessionDescription(offerDescription));

  const answerDescription = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answerDescription);

  const answer = {
    type: answerDescription.type,
    sdp: answerDescription.sdp,
  };
  await callDocument.update({ answer, 'status.answered': true });

  offerCandidates.onSnapshot((snapshot: any) => {
    snapshot.docChanges().forEach((change: any) => {
      if (change.type === 'added') {
        const data = change.doc.data();
        peerConnection.addIceCandidate(new RTCIceCandidate(data));
      }
    });
  });
};

export default takeCall;
