import { connectionActions } from '../slices/connectionSlice';
import { buildInteractorDirectAction, buildInteractorDirectActionNoParams } from './base';

export const setLocalStreamInteractor = buildInteractorDirectAction(connectionActions.addLocalStream);

export const resetLocalStreamInteractor = buildInteractorDirectActionNoParams(connectionActions.removeLocalStream);

export const setRemoteStreamInteractor = buildInteractorDirectAction(connectionActions.addRemoteStream);

export const resetRemoteStreamInteractor = buildInteractorDirectActionNoParams(connectionActions.removeRemoteStream);

export const resetStreamConnectionInteractor = buildInteractorDirectActionNoParams(
  connectionActions.resetStreamConnection,
);

export const setCallStateTrueInteractor = buildInteractorDirectActionNoParams(connectionActions.setCallStateTrue);

export const setCallStateFalseInteractor = buildInteractorDirectActionNoParams(connectionActions.setCallStateFalse);
