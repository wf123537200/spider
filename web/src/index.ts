import dva from 'dva';
import createLoading from 'dva-loading';
import createHistory from 'history/createHashHistory';
import { parse, stringify } from 'qs';
import { qsName, defaultLocale } from 'src/config/locales';
import appModel from './models/app';
import router from './router';

const history = createHistory();

// 自动添加语言参数
function handleLocaleQuery(path) {
  const oldQuery = parse(history.location.search.slice(1));
  if (typeof path === 'string') {
    const qsIndex = path.indexOf('?');
    const originPath = qsIndex !== -1 ? path.slice(0, qsIndex) : path;
    const newQuery = qsIndex !== -1 ? parse(path.slice(qsIndex + 1)) : {};
    return `${originPath}?${stringify({
      ...newQuery,
      [qsName]: newQuery[qsName] || oldQuery[qsName] || defaultLocale,
    })}`;
  }
  const newQuery = path.search ? parse(path.search.slice(1)) : {};
  return {
    ...path,
    search: `?${stringify({
      ...newQuery,
      [qsName]: newQuery[qsName] || oldQuery[qsName] || defaultLocale,
    })}`
  };
}

const { push, replace } = history;

history.push = (path, state?) => {
  const newPath = handleLocaleQuery(path);
  return push(newPath, state);
};

history.replace = (path, state?) => {
  const newPath = handleLocaleQuery(path);
  return replace(newPath, state);
};

// 1. Initialize
const app = dva({
  ...createLoading({ effects: true }),
  history,
  onError() {
    // xhr错误将在request中统一处理
    return null;
  }
});

// 2. Model
app.model(appModel);
// 3. Router
app.router(router);

// 4. Start
app.start('#root');

if (__DEV__) {
  console.log(
    [
      'window._store 挂载了 dva_store 便于调试',
      '通过设置 ?locale=en_US 切换英文'
    ].map((item, index) => `${index + 1}. ${item}`).join('\n')
  );
  (window as any)._store = (app as any)._store;
}
