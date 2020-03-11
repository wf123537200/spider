import { cloneDeep } from 'lodash';

// 连字符转驼峰
function hyphenToHump(str: string): string {
  return str.replace(/-(\w)/g, (...args) => args[1].toUpperCase());
}

// 驼峰转连字符
function humpToHyphen(str: string): string {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

// 日期格式化
// 'yyyy-MM-dd hh:mm:ss'
function dateFormat(date: Date, format: string): string {
  const o: {
    [key: string]: any;
  } = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  };
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      );
    }
  }
  return format;
}

/**
 * 在url的queryString中查询对应的键
 * @param   {String}
 * @return  {String}
 */
function queryURL(name: string): string | null {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURI(r[2]);
  }
  return null;
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
function queryArray(
  array: { [key: string]: string }[],
  key: string,
  keyAlias = 'key'
) {
  if (!(array instanceof Array)) {
    return null;
  }
  const item = array.filter(_ => _[keyAlias] === key);
  if (item.length) {
    return item[0];
  }
  return null;
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
function arrayToTree(
  array: any[],
  id = 'id',
  pid = 'pid',
  children = 'children'
) {
  const data = cloneDeep(array);
  const result: any[] = [];
  const hash: any = {};
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index];
  });

  data.forEach(item => {
    const hashVP = hash[item[pid]];
    if (hashVP) {
      if (!hashVP[children]) {
        hashVP[children] = [];
      }
      hashVP[children].push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}

function treeToArrayHelper(
  tree: any[],
  id: string,
  pid: string,
  children: string,
  parent: any = null
): any[] {
  const data = cloneDeep(tree);
  return data.reduce((accumulator, item) => {
    const { [children]: itemChildren } = item;
    let result;
    if (parent && !item[pid]) {
      item[pid] = parent[id];
    }
    if (parent) {
      item.deepPath = parent.deepPath.concat(item[id]);
    } else {
      item.deepPath = [item[id]];
    }
    if (itemChildren) {
      result = accumulator.concat(
        item,
        treeToArrayHelper(itemChildren, id, pid, children, item)
      );
      delete item[children];
    } else {
      result = accumulator.concat(item);
    }
    return result;
  }, []);
}

/**
 * 树状结构转数组格式
 * @param  {Array}    tree                  树状结构的数组
 * @param  {String}   [id='id']             parent id的 key
 * @param  {String}   [pid='pid']           子item映射parent id的key
 * @param  {String}   [children='children'] children的key
 * @return {Array}
 */
function treeToArray(
  tree: any[],
  id = 'id',
  pid = 'pid',
  children = 'children'
) {
  return treeToArrayHelper(tree, id, pid, children);
}

/**
 * 获取对象深层链式属性值
 * @param {object} obj
 * @param {string} keyChain example:'user.name'
 * @return {any} example: return obj.user.name
 */
function getDeepObjectAttr(obj, keyChain): any {
  return keyChain.split('.').reduce((nestedObj, key) => {
    if (nestedObj && nestedObj[key]) {
      return nestedObj[key];
    }
    return undefined;
  }, obj);
}

export {
  hyphenToHump,
  humpToHyphen,
  dateFormat,
  queryURL,
  queryArray,
  arrayToTree,
  treeToArray,
  getDeepObjectAttr
};
