// prettier-ignore
// / <reference types="node" />
// / <reference types="react" />
// / <reference types="react-dom" />
// / <reference types="react-router" />
// / <reference types="react-router-dom" />
// / <reference types="react-router-redux" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare const __DEV__: boolean;

/**
 * 项目通用模块ts声明
 */
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}

declare module '*.less' {
  const content: { readonly [className: string]: string };
  export default content;
}

declare module '*.less?local' {
  const content: { readonly [className: string]: string };
  export default content;
}

declare module 'dva-loading' {
  export default function createLoading(arg: {[key: string]: any}): any;
}

declare module 'dva-model-extend' {
  export default function modelExtend(...rest: any[]): any;
}
