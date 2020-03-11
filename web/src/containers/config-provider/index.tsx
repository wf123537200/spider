import { ConfigProvider } from 'antd';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { AppModelType } from 'src/models/app';

// props 类型检查，对每一个输入参数都必须检查
export interface LocalProviderType {
  // 子内容
  children: React.ReactNode;
  app: AppModelType;
  messages: object;
}

const Provider = ({ app, children, messages }: LocalProviderType) => {
  const { intl, antd } = app;
  // 若intl语言未加载，强行渲染控制套会报错
  if (!intl) { return null; }

  return (
    <IntlProvider locale={intl} messages={messages}>
      <ConfigProvider locale={antd}>
        {children}
      </ConfigProvider>
    </IntlProvider>
  );
};

// 为什么使用withRouter
// https://github.com/dvajs/dva/issues/1889
export default withRouter(connect(({app = {}}) => ({
  app,
}))(Provider));
