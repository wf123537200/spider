interface StateArgsType {
  payload: {
    [key: string]: any;
  };
}

const commonModel = {
  reducers: {
    updateState(state, { payload }: StateArgsType) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default commonModel;
