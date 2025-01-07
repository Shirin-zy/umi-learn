import React from 'react';
import { Layout, Menu } from 'antd';
// import { Link } from 'react-router-dom';
import { Link } from 'umi';
const { Header, Content, Footer } = Layout;
import styles from '../layouts/index.less';
import item from '@/pages/item';
const enumData = [
  { router: '/hero', name: '英雄' },
  { router: '/item', name: '局内道具' },
  { router: '/summoner', name: '召唤师技能' },
  { router: '/order/createOrder', name: '工单' },
];
// 作为全局布局,接收一个props
function BasicLayout(props) {
  const { location } = props;
  const isPathInEnumData = enumData.some(
    (item) => item.router === location.pathname,
  );
  if (!isPathInEnumData) {
    return <Content>{props.children}</Content>;
  }
  const isOrder = location.pathname === enumData[3].router;
  if (isOrder) {
    return <Content>{props.children}</Content>;
  }
  return (
    <Layout>
      <Header>
        <div className={styles.logo}>资料库</div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['0']}
          style={{ lineHeight: '64px' }}
        >
          {enumData.map((menu, index) => (
            <Menu.Item key={index}>
              <Link to={menu.router}>{menu.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          {/** 一定要包裹住props.children,页面会被传入并自动使用umi进行包裹 **/}
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Umi 入门教程 Created by xiaohuoni
      </Footer>
    </Layout>
  );
}

export default BasicLayout;
