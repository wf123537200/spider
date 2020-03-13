import modelExtend from 'dva-model-extend';
import services from 'src/utils/services';
import commonModel from './common';

export interface QuickstartType {
  userInfo: any;
}

export default modelExtend(commonModel, {
  namespace: 'quickstart',

  state: {
    userInfo: {
      rootDir: '/saveRoot'
    }
  },

  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        dispatch({
          type: 'getUserInfo',
        });
      });
    },
  },

  effects: {
    * saveRootDir({ payload }, { call }) {
      const params = {
        ...payload
      };
      yield call(services['global/saveRootDir'], params);
    },

    * getUserInfo({payload}, {call, put}) {
      const data = yield call(services['global/getUserInfo']);
      yield put({
        type: 'updateState',
        payload: {
          userInfo: data
        }
      });
    },
  },
});
