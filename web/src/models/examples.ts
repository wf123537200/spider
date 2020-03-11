import modelExtend from 'dva-model-extend';
import services from 'src/utils/services';
import commonModel from './common';

export default modelExtend(commonModel, {
  namespace: 'examples',

  effects: {
    * get({ payload }, { call }) {
      yield call(services['global/get'], payload);
    },

    * getWithDynamicSegment({ payload }, { call }) {
      yield call(services['global/getWithDynamicSegment'], {
        keyword: payload.keyword,
      }, {
        dynamicSegment: { id: payload.id },
      });
    },

    * post({ payload }, { call }) {
      const params = {
        name: payload.name,
      };
      const options = {
        dynamicSegment: { id: payload.id },
      };
      yield call(services['global/post'], params, options);
    },

    * postWithQuerystring({ payload }, { call }) {
      const params = {
        name: payload.name,
      };
      const options = {
        // 指定contentType
        contentType: 'application/json',
        // 带动态路径参数
        dynamicSegment: { id: payload.id },
        // 带qs
        params: payload.params,
      };
      yield call(services['global/post'], params, options);
    },

    * put({ payload }, { call }) {
      const params = {
        userId: payload.id,
      };
      yield call(services['global/put'], params);
    },

    * delete(action, { call }) {
      yield call(services['global/delete']);
    },
  },
});
