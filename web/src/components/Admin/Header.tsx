import { Layout } from 'antd';
import { Link } from 'dva/router';
import * as React from 'react';
import { ReactComponent as SvgComponent } from 'src/public/react.svg';
import { menuTree } from 'src/config/menu';
import Menu from './Menu';
import styles from './index.less?local';

const Header = ({pathname}) => {
  return (
    <Layout.Header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <SvgComponent />
        <span style={{padding: '0 10px'}}>React Seed 3 TS</span>
      </Link>

      <Menu
        mode="horizontal"
        theme="dark"
        maxDeep={1}
        menuData={menuTree}
        pathname={pathname}
        style={{flex: 1}}
      />

      <div>danielzli</div>
    </Layout.Header>
  );
};

export default Header;
