import modelExtend from 'dva-model-extend';
import services from 'src/utils/services';
import commonModel from './common';

export default modelExtend(commonModel, {
  namespace: 'quickstart',

  effects: {
    * saveRootDir({ payload }, { call }) {
      yield call(services['global/saveRootDir']);
    },
  },
});
