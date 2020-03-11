import modelExtend from 'dva-model-extend';
import { parse } from 'qs';
import { addLocaleData } from 'react-intl';
import {
  defaultLocale,
  locales as localesConfig,
  qsName
} from 'src/config/locales';
import commonModel from './common';

interface ImportLocalePayload {
  intlLocaleName: string;
  antdLocaleName: string;
  locale: string;
}

export interface AppModelType {
  locale: string;
  intl: string;
  antd: any;
  isSiderFold: boolean;
  locationPathname: string;
  locationQuery: {
    [key: string]: string;
  };
}

export default modelExtend(commonModel, {
  namespace: 'app',

  state: {
    // 注意: locale相关的语言设置初始值应在subscriptions中生成
    // App语言
    locale: '',
    // intl使用的语言
    intl: '',
    // antd使用的语言包
    antd: {},
    isSiderFold: false,
    // location相关
    locationPathname: '',
    locationQuery: {}
  },

  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        const query = parse(search.slice(1));

        dispatch({
          type: 'updateLocale',
          payload: { query },
        });
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: pathname,
            locationQuery: query
          }
        });
      });
    },
  },

  effects: {
    // 语言重定向控制: 无语言参数|切换语言参数
    //   更新语言, 若没有显示切换, 自动使用已有语言缓存
    //   不在配置区域内的语言声明将被忽略, query参数将被自动补全
    * updateLocale({ payload }: {payload: {[key: string]: string}}, { put, select }) {
      const { query } = payload;
      const qsLocale = query && query[qsName];
      const oldLocale = yield select(state => state.app.locale);
      const newLocale = qsLocale && localesConfig[qsLocale] ? qsLocale : '';
      if (!newLocale && oldLocale) {
        console.error('[框架] 发生语言参数丢失, 建议使用全局注入的history进行路由跳转');
      }

      if (newLocale !== oldLocale || !oldLocale) {
        const locale = newLocale || oldLocale || defaultLocale;
        const { antd, intl } = localesConfig[locale];
        yield put({
          type: 'importLocale',
          payload: {
            intlLocaleName: intl,
            antdLocaleName: antd,
            locale,
          },
        });
      }
    },

    // 加载语言包
    * importLocale({ payload }: { payload: ImportLocalePayload }, { put }) {
      const { intlLocaleName, antdLocaleName, locale } = payload;
      const [intl, antd] = yield Promise.all([
        // 加载 react-intl 资源文件
        import(
          /* webpackInclude: /(zh|en)\.js$/ */
          /* webpackChunkName: 'intl-locales-[request]' */
          `react-intl/locale-data/${intlLocaleName}.js`
        ),
        // 加载 antd 资源文件
        import(
          /* webpackInclude: /(zh_CN|en_US)\.js$/ */
          /* webpackChunkName: 'antd-locales-[request]' */
          `antd/es/locale/${antdLocaleName}.js`
        )
      ]);
      addLocaleData([...intl.default]);
      yield put({
        type: 'updateState',
        payload: {
          antd: antd.default,
          intl: intlLocaleName,
          locale
        }
      });
    },
  },

  reducers: {
    switchSiderFold(state) {
      const newFlag = !state.isSiderFold;
      return {
        ...state,
        isSiderFold: newFlag
      };
    },
  }
});
