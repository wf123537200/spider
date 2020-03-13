import { Layout } from 'antd';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Dispatch } from 'redux';
import {
  AdminHeader,
  AdminSider,
  AdminFooter,
} from 'src/components/Admin';
import { AppModelType } from 'src/models/app';

interface AppType {
  dispatch: Dispatch<{ type: string; payload?: any }>;
  children: React.ReactNode;
  app: AppModelType;
  // loading: {
  //   global: boolean;
  // };
  location: any;
}

const App: React.FC<AppModelType & AppType> = ({
  dispatch,
  children,
  app,
  location,
  // loading
}) => {
  const { pathname } = location;
  const { isSiderFold } = app;

  const siderProps = {
    pathname,
    isSiderFold,
    switchSiderFold() {
      dispatch({ type: 'app/switchSiderFold' });
    },
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>爬虫馆</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="" type="image/x-icon" />
      </Helmet>

      <Layout style={{height: '100%'}}>
        <AdminHeader pathname={pathname} />

        <Layout>
          <AdminSider {...siderProps} />
          <Layout>
            <Layout.Content style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{flex: '1'}}>{children}</div>
              <AdminFooter />
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    </React.Fragment>
  );
};


export default withRouter(connect(({ app = {}, loading }) => ({
  loading,
  app,
}))(App));
