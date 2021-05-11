import modelExtend from 'dva-model-extend';
import services from 'src/utils/services';
import commonModel from './common';

export interface SpiderType {
  targetUrl: string;
  res: any;
  type: string;
}

export default modelExtend(commonModel, {
  namespace: 'spider',

  state: {
    targetUrl: '',
    res: {
      addr: '',
      total: ''
    }
  },

  subscriptions: {
    // 启动时加载
    // setupHistory({ dispatch, history }) {
    //   history.listen(({ pathname, search }) => {
    //     dispatch({
    //       type: 'getUserInfo',
    //     });
    //   });
    // },
  },

  effects: {
    * run({ payload }, { call, put }) {
      const params = {
        ...payload
      };
      const data = yield call(services['global/runSpider'], params);
      yield put({
        type: 'updateState',
        payload: {
          res: data
        }
      });
    },
    * runWithHandless({ payload }, { call, put }) {
      const params = {
        ...payload
      };
      const data = yield call(services['global/runSpiderWithHandless'], params);
      yield put({
        type: 'updateState',
        payload: {
          res: data
        }
      });
    },
  },
});
