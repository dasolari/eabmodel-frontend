/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export interface Action {
  payload: any;
  type: string;
}

const baseSuccessReducer =
  (requestName: string, initialState: any, resourceName: string) => (state: typeof initialState, action: Action) => {
    return {
      ...state,
      [resourceName]: action.payload,
      [`${requestName}Status`]: {
        loading: false,
        success: true,
        error: false,
      },
    };
  };

const baseLoadingReducer = (initialState: any, requestName: string) => (state: typeof initialState) => {
  return {
    ...state,
    [`${requestName}Status`]: { loading: true, success: false, error: false },
  };
};

const baseErrorReducer = (initialState: any, requestName: string) => (state: typeof initialState, action: Action) => {
  return {
    ...state,
    [`${requestName}Status`]: {
      loading: false,
      success: false,
      error: action.payload || true,
    },
  };
};

const baseResetReducer = (initialState: any, requestName: string) => (state: typeof initialState) => {
  return {
    ...state,
    [`${requestName}Status`]: initialState[`${requestName}Status`],
  };
};

export const baseRequestStatusReducers = (
  requestName: string,
  initialState: any,
  resourceName: string | null,
  successReducer = baseSuccessReducer(requestName, initialState, resourceName!),
  loadingReducer = baseLoadingReducer(initialState, requestName),
  errorReducer = baseErrorReducer(initialState, requestName),
  resetReducer = baseResetReducer(initialState, requestName),
): any => {
  const requestNameFirstCapital = requestName[0].toUpperCase() + requestName.slice(1);
  return {
    [`loading${requestNameFirstCapital}`]: loadingReducer,
    [`success${requestNameFirstCapital}`]: successReducer,
    [`error${requestNameFirstCapital}`]: errorReducer,
    [`reset${requestNameFirstCapital}`]: resetReducer,
  };
};
