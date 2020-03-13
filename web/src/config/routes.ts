import * as React from 'react';

export interface RouteItemType {
  // 路由路径
  path: string;
  // 语言包
  locale?: (locale: string) => Promise<{ [key: string]: string }>;
  // 组件
  component?: () => Promise<React.ReactNode>;
  // dva model
  models?: () => (Promise<any>)[];
  // 子路由
  childRoutes?: RouteItemType[];
}

const portalRoutes: RouteItemType[] = [
];

const adminRoutes: RouteItemType[] = [
  {
    path: '/',
    component: () => import('src/pages/quickstart'),
    models: () => [import('src/models/quickstart')],
  },
  {
    path: '/quickstart',
    component: () => import('src/pages/quickstart'),
    models: () => [import('src/models/quickstart')],
  }, {
    path: '/spider',
    childRoutes: [
      {
        path: '/3had',
        component: () => import('src/pages/spider/3had'),
        models: () => [import('src/models/spider')],
      },
    ],
  },
];

export { portalRoutes, adminRoutes };
