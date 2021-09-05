// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const setSources = async ({ peerConnection, webcamVideo, remoteVideo }: any) => {
  const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  const remoteStream = new MediaStream();

  localStream.getTracks().forEach((track: any) => {
    peerConnection.addTrack(track, localStream);
  });

  peerConnection.ontrack = (event: any) => {
    event.streams[0].getTracks().forEach((track: any) => {
      remoteStream.addTrack(track);
    });
  };

  webcamVideo.srcObject = localStream;
  remoteVideo.srcObject = remoteStream;

  return { localStream, remoteStream };
};

export default setSources;
