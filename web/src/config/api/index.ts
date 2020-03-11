import global from './global';
import project from './project';

interface ConfigType {
  apiPrefix: string;
  CORS: string[];
  YQL: string[];
  api: {
    [key: string]: string;
  };
}

interface ApiItemType {
  namespace: string;
  apis: {
    [key: string]: string;
  };
}

const api = [project, global].reduce((acc: object, item: ApiItemType) => {
  const current: {
    [key: string]: string;
  } = {};
  for (const key of Object.keys(item.apis)) {
    const value = item.apis[key];
    const scopedKey = `${item.namespace}/${key}`;
    current[scopedKey] = value;
  }

  return {
    ...acc,
    ...current,
  };
}, {});

const config: ConfigType = {
  apiPrefix: '/api',
  CORS: [],
  YQL: [],
  api,
};

export default config;
