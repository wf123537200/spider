import apiConfig from 'src/config/api';
import request from './request';

// ps:
// 若使用了动态路径参数, 例如'get/:id/cars',
//   可以使用config.dynamicSegment, 系统会自动获取对应值进行填充
//   config还内置了其他可配置的键, 见ConfigType
//
// 1. GET: data默认是queryString(data[, config])
// 2. POST, PUT等: data默认是reqBody(data[, config]);

const { api, apiPrefix } = apiConfig;

type ConfigType = Partial<{
  // 非GET时仍需使用queryString在此传入
  params: {[key: string]: string | number | boolean};
  // 动态路径参数, 仿路由设计
  dynamicSegment: {[key: string]: string | number};
  noGlobalError: boolean;
  contentType: string;
  fetchType: string;
}>

type ArgsType = [any] | [any, ConfigType];

const gen = (params: string) => {
  let url = apiPrefix + params;
  let method = 'get';

  const paramsArray = params.split(' ');
  if (paramsArray.length === 2) {
    [method] = [...paramsArray];
    url = apiPrefix + paramsArray[1];
  }

  return function (...rest: ArgsType) {
    const [data, config] = [...rest];

    return request({
      url,
      data,
      method,
      ...config,
    });
  };
};

const APIHelper: {[key: string]: (...rest: ArgsType) => any} = {};

for (const key in api) {
  APIHelper[key] = gen(api[key]);
}

export default APIHelper;
