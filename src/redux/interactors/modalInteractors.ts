import { modalActions } from '../slices/modalSlice';
import { buildInteractorDirectActionNoParams } from './base';

export const showPopUpInteractor = buildInteractorDirectActionNoParams(modalActions.showLogIn);

export const closePopUpInteractor = buildInteractorDirectActionNoParams(modalActions.closeLogIn);
