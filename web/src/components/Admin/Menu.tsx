import * as React from 'react';
import * as pathToRegexp from 'path-to-regexp';
import { Icon, Menu } from 'antd';
import { MenuProps } from 'antd/es/menu';
import { Link } from 'dva/router';
import { MenuItemType } from 'src/config/menu';

export interface MenuPropsType extends MenuProps {
  menuData: MenuItemType[];
  pathname: string;
  collapsed?: boolean;
  maxDeep?: number;
}

function getDeepRoute(children) {
  if (!children) return '';
  const item = children[0] || {};
  return item.children
    ? getDeepRoute(item.children)
    : item.route;
}

const Menus: React.FC<MenuPropsType> = ({
  pathname,
  menuData,
  collapsed = false,
  maxDeep = Infinity,
  ...otherProps
}) => {
  // 递归生成菜单
  const getMenus = (menuTree: MenuItemType[], deep = 1) => {
    return menuTree.map((item) => {
      if (item.children && deep < maxDeep) {
        return (
          <Menu.SubMenu
            key={item.id}
            title={(
              <span>
                {item.icon && <Icon type={item.icon} />}
                {item.name}
              </span>
            )}
          >
            {getMenus(item.children, deep + 1)}
          </Menu.SubMenu>
        );
      }

      let { route } = item;
      if (item.children && deep >= maxDeep) {
        // 因为被阻止了继续递归，所以需查找孩子节点的路由
        route = getDeepRoute(item.children);
      }

      return (
        <Menu.Item key={item.id} title={collapsed ? item.name : ''}>
          <Link to={route || '#'}>
            {item.icon && <Icon type={item.icon} />}
            <span>{item.name}</span>
          </Link>
        </Menu.Item>
      );
    });
  };

  if (!menuData) return null;

  const getSelectedMenu = (menuData) => {
    let result;
    for (const item of menuData) {
      if (item.route && pathToRegexp(item.route).exec(pathname)) {
        result = item;
        break;
      } else if (item.children) {
        result = getSelectedMenu(item.children);
        if (result) break;
      }
    }
    return result;
  };

  // 寻找选中路由
  let currentMenu = getSelectedMenu(menuData);
  let defaultSelectedKeys;

  if (currentMenu) {
    defaultSelectedKeys = currentMenu.deepPath;
  }

  // 当前模块下的菜单
  const menuItems = getMenus(menuData);

  return (
    <Menu {...otherProps} selectedKeys={defaultSelectedKeys}>
      {menuItems}
    </Menu>
  );
};

export default Menus;
