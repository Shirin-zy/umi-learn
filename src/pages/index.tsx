import React from 'react';
import { Redirect } from 'umi';

const IndexPage: React.FC = () => {
  return <Redirect to="/hero" />; // 重定向到 /hero 页面
};

export default IndexPage;
