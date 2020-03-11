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
  {
    path: '/',
    locale: locale => import(
      /* webpackChunkName: 'async-index-locales-[request]' */
      `src/pages/index/locales/${locale}`
    ),
    component: () => import(
      /* webpackChunkName: 'async-index' */
      'src/pages/index'
    ),
  },
];

const adminRoutes: RouteItemType[] = [
  {
    path: '/quickstart',
    component: () => import('src/pages/quickstart'),
    models: () => [import('src/models/quickstart')],
  }, {
    path: '/examples',
    childRoutes: [
      {
        path: '/request',
        component: () => import('src/pages/examples/request'),
        models: () => [import('src/models/examples')],
      }, {
        path: '/mock',
        component: () => import('src/pages/examples/mock'),
      }, {
        path: '/intl',
        component: () => import('src/pages/examples/intl'),
        locale: locale => import(`src/pages/examples/locales/${locale}`),
      },
    ],
  },
];

export { portalRoutes, adminRoutes };
