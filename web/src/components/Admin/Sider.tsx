import * as React from 'react';
import { Layout } from 'antd';
import { menuTree } from 'src/config/menu';
import Menu from './Menu';

interface SiderProps {
  isSiderFold: boolean;
  switchSiderFold: (collapsed) => void;
  pathname: string;
}

const Sider: React.FC<SiderProps> = ({
  isSiderFold = true,
  switchSiderFold,
  pathname,
  children,
}) => {
  return (
    <Layout.Sider
      width={200}
      collapsible
      collapsed={isSiderFold}
      onCollapse={switchSiderFold}
    >
      <Menu
        mode="inline"
        theme="dark"
        menuData={menuTree}
        collapsed={isSiderFold}
        pathname={pathname}
        defaultOpenKeys={menuTree.map(item => item.id)}
      />
      {children}
    </Layout.Sider>
  );
};

export default Sider;
