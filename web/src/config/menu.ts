import { treeToArray, arrayToTree } from '../utils';

export interface MenuItemType {
  // 名称
  name: string;
  // 唯一标识，与后端数据一致(部分后端不存在数据的模块例外，例如个人中心)
  id: string;
  // 图标
  icon?: string;
  // 孩子
  children?: MenuItemType[];
  // 路由
  route?: string;
}
const menuTreeOrigin = [
  {
    id: 'quickstart',
    name: '爬虫系统介绍',
    icon: 'home',
    route: '/quickstart',
  },
  {
    id: 'spiderList',
    name: '爬虫列表',
    icon: 'bug',
    children: [
      {
        id: 'request',
        name: '3had',
        route: '/spider/3had'
      },
    ],
  },
];

export const menu = treeToArray(menuTreeOrigin);
export const menuTree = arrayToTree(menu);
