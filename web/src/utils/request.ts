import { message as Message } from 'antd';
import axios from 'axios';
import * as fetchJsonp from 'fetch-jsonp';
import { cloneDeep } from 'lodash';
import { stringify } from 'qs';
import apiConfig from 'src/config/api';

const { YQL, CORS } = apiConfig;

// 超时配置
axios.defaults.timeout = 30 * 1000;

export interface FetchOptions {
  method: string;
  url: string;
  // data为queryString或reqBody
  data?: any;
  // params仅为非GET时使用(作为queryString)
  params?: object;
  fetchType?: 'CORS' | 'YQL' | 'JSONP' | undefined;
  contentType?: string;
  needToken?: boolean;
  // 路径URL参数(:id)
  dynamicSegment?: {[key: string]: string | number};
  // 若路径URL带参数(:id)会自动执行处理, 设置true将取消路径参数的处理逻辑
  //   可能存在某些特殊url是本身就带:符号的(/api/:oauth/xxx)
  noDynamicSegment?: boolean;
}

export interface RequestOptions extends FetchOptions {
  // 不使用全局请求错误提示
  noGlobalError?: boolean;
}

const fetch = (options: FetchOptions) => {
  const {
    method = 'get',
    params = null,
    contentType,
    needToken,
    dynamicSegment,
    noDynamicSegment = false,
  } = options;
  let { url, data, fetchType } = options;

  const cloneData = cloneDeep(data);
  // 请求默认添加token参数
  if (needToken) {
    try {
      const userInfo = window.localStorage.getItem('userInfo');
      if (userInfo) {
        const { token } = JSON.parse(userInfo);
        if (token && token.length > 0) {
          const key = 'session_id';
          cloneData[key] = token;
        }
      }
    } catch (err) {
      console.error('[框架] REQUEST ERROR', err);
    }
  }

  try {
    if (/^[a-zA-z]+:\/\/\S+/.test(url)) {
      // 处理https://
      const { origin } = new URL(url);
      if (window.location.origin !== origin) {
        if (CORS && CORS.indexOf(origin) > -1) {
          fetchType = 'CORS';
        } else if (YQL && YQL.indexOf(origin) > -1) {
          fetchType = 'YQL';
        } else {
          fetchType = 'JSONP';
        }
      }
    }
    if (!noDynamicSegment && dynamicSegment && url.indexOf(':') !== -1) {
      // 处理/:id URL路径
      url = url.replace(/:(\w+)/g, ($0, $1) => dynamicSegment[$1].toString());
    }
  } catch (err) {
    console.error('[框架] REQUEST ERROR', err);
  }

  if (fetchType === 'JSONP') {
    return new Promise((resolve, reject) => {
      fetchJsonp(url)
        .then(res => res.json())
        .then(result => {
          resolve({ statusText: 'OK', status: 200, data: result });
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  }

  if (fetchType === 'YQL') {
    url = `http://query.yahooapis.com/v1/public/yql?q=select * from json where url='${url}?${encodeURIComponent(
      stringify(data),
    )}'&format=json`;
    data = null;
  }

  const config = {} as any;
  if (contentType) {
    config.headers = {['Content-Type']: contentType};
  }
  if (method !== 'get' && params) {
    config.params = params;
  }

  switch (method) {
    case 'get':
      return axios.get(url, {
        params: data,
        ...config,
      });
    case 'delete':
      return axios.delete(url, {
        data,
        ...config,
      });
    case 'post':
      return axios.post(url, data, config);
    case 'put':
      return axios.put(url, data, config);
    case 'patch':
      return axios.patch(url, data, config);
    default:
      return axios(options as any);
  }
};

export default function request(options: RequestOptions) {
  return fetch(options)
    .then((response: any) => {
      // const { statusText, status } = response;
      let data = options.fetchType === 'YQL' ? response.data.query.results.json : response.data;
      if (data instanceof Array) {
        data = {
          resultData: data,
        };
      }

      const { resultCode, resultData, message } = data;

      if (typeof resultCode !== 'undefined' && resultCode !== '0' && resultCode !== 'ok') {
        // 不需要全局错误提示
        if (options.noGlobalError) {
          return Promise.resolve({
            ...data,
          });
        }

        let msg;
        // 请求200, 但是请求错误的情况
        switch (resultCode) {
          case '403':
            msg = '无权限';
            break;
          case '407':
            msg = '登录失效';
            // location.href = '';
            break;
          case '500':
            msg = '接口异常';
            break;
          default:
            msg = message;
        }
        return Promise.reject(new Error(msg));
      }

      return Promise.resolve(resultData);
    })
    .catch(error => {
      const { response, message } = error;
      let msg = message;

      if (response && response instanceof Object) {
        // 请求失败的情况: 404, 500, ...
        const { /* status, */ data, statusText } = response;
        msg = data.message || statusText;
      }

      Message.error(msg);
      return Promise.reject(new Error(msg));
    });
}
