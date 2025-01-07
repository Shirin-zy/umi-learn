import React from 'react';
import { Layout, Menu, ConfigProvider } from 'antd';
import { Link, useHistory } from 'umi';
const { Header, Content, Footer } = Layout;
import styles from '../layouts/index.less';

const enumData = [
  { router: '/hero', name: '英雄' },
  { router: '/item', name: '局内道具' },
  { router: '/summoner', name: '召唤师技能' },
  {
    router: '/order/createOrder',
    name: '工单',
  },
];

const orerMenu = [
  { router: '/wisdom/wisdomassist', name: '智能辅助' },
  { router: '/order/createOrder', name: '工单' },
  { router: '/manger/guanyiyun', name: '管易云' },
];

interface HeaderInfo {
  shopName: string;
  type: string;
  waitDealByHuman: number;
}

const info: HeaderInfo = {
  shopName: '520辉辉丽丽辉',
  type: '商家版',
  waitDealByHuman: 0,
};

// 作为全局布局,接收一个props
function BasicLayout(props) {
  const history = useHistory();
  const { location } = props;
  console.log(location.pathname);
  // 是否需要主使用布局
  const isPathInEnumData = enumData.some(
    (item) => item.router === location.pathname,
  );

  // 返回主界面
  const back = () => {
    history.push('/hero');
  };
  // if (!isPathInEnumData) {
  //   return <Content>{props.children}</Content>;
  // }
  // const isOrder = location.pathname === enumData[3].router;
  // if (isOrder) {
  //   return <Content>{props.children}</Content>;
  // }
  // 是否为工单界面
  const isOrder = orerMenu.some((item) => item.router === location.pathname);
  if (isOrder) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <header className={styles.header}>
            {' '}
            <div className={styles.headerInfo}>
              <div className={styles.left}>{info.shopName}</div>
              <div className={styles.middle}>
                <p>{info.type}</p>
              </div>
              <div className={styles.right} onClick={() => back()}>
                返回
              </div>
            </div>
            <div>
              <ConfigProvider
                theme={{
                  components: {
                    Menu: {
                      itemBg: '#21a9b7',
                    },
                  },
                }}
              >
                <Menu
                  mode="horizontal"
                  style={{ lineHeight: '50px' }}
                  defaultSelectedKeys={['0']}
                  theme="light"
                >
                  {orerMenu.map((item, index) => (
                    <Menu.Item key={index}>
                      {' '}
                      <Link to={item.router}>{item.name}</Link>
                    </Menu.Item>
                  ))}
                </Menu>
              </ConfigProvider>
            </div>
          </header>
          <div className={styles.content}>{props.children}</div>
          <footer className={styles.footer}>
            <div>{`需人工接待(${info.waitDealByHuman})`}</div>
            <div>配置入口</div>
          </footer>
        </div>
      </div>
    );
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
