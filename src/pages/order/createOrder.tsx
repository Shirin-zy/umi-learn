import React, { FC, useState } from 'react';
import styles from './createOrder.less';
import { Button, Modal } from 'antd';
import {
  MobileOutlined,
  UndoOutlined,
  UserOutlined,
  RightOutlined,
} from '@ant-design/icons';
const Page = () => {
  // 管理简单弹出框状态
  const [isModalOpen, setIsModalStau] = useState(false);

  const changeModalStatu = () => {
    setIsModalStau(!isModalOpen);
  };

  return (
    <div>
      <div className={styles.header}>
        <div>
          <Button
            size="small"
            type="primary"
            style={{ margin: '0 5px 0 10px' }}
            onClick={changeModalStatu}
          >
            + 快捷建单
          </Button>
          <Button size="small" style={{ margin: '0 5px' }}>
            <MobileOutlined />
          </Button>
          <UndoOutlined style={{ margin: '0 5px' }} />
        </div>
        <div className={styles.enterOrder}>
          <div>
            <UserOutlined style={{ margin: '0 10px 0 0' }} />
            进入工单
            <RightOutlined />
          </div>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={changeModalStatu}
        destroyOnClose={true}
        maskClosable={false}
        getContainer={false}
        width={360}
      >
        建单
      </Modal>
    </div>
  );
};

export default Page;
