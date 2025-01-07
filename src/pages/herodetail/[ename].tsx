import React, { FC } from 'react';
import styles from './ename.less';
import { ConnectProps } from 'umi';

interface PageProps extends ConnectProps {}
const Page: FC<PageProps> = (props) => {
  // console.log(props.match);
  return (
    <div>
      <h1 className={styles.title}>{props.match.params.ename}</h1>
    </div>
  );
};
export default Page;
