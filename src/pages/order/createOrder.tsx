import React, { FC } from 'react';
import { connect, ConnectProps } from 'umi';
import styles from './createOrder.less';
import { Menu, ConfigProvider } from 'antd';
import item from '../item';

interface PageProps extends ConnectProps {}

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

const menuData = [
  { router: '/', name: '智能辅助' },
  { router: '/', name: '工单' },
  { router: '/', name: '管易云' },
];
const OrderPage: FC<PageProps> = (props) => {
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
            <div className={styles.right}>隐藏</div>
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
                {menuData.map((item, index) => (
                  <Menu.Item key={index}>{item.name}</Menu.Item>
                ))}
              </Menu>
            </ConfigProvider>
          </div>
        </header>
        <div className={styles.content}></div>
        <footer className={styles.footer}>
          <div>{`需人工接待(${info.waitDealByHuman})`}</div>
          <div>配置入口</div>
        </footer>
      </div>
    </div>
  );
};

export default OrderPage;
