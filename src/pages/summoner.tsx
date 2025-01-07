import React, { FC } from 'react';
import styles from './summoner.less';
import { connect, ConnectProps, SummonerModelState } from 'umi';
import { Row, Col, Radio, Card } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio/interface';

interface PageProps extends ConnectProps {
  summoner: SummonerModelState;
}
const Summoner: FC<PageProps> = (props) => {
  const { summoner } = props;
  const { summoners } = summoner;

  return (
    <div>
      <Row>
        {summoners.reverse().map((item) => (
          <Col key={item.summoner_id} span={3} className={styles.sunmmoneritem}>
            <img
              src={`https://game.gtimg.cn/images/yxzj/img201606/summoner/${item.summoner_id}.jpg`}
            />
            <p>{item.summoner_name}</p>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default connect(({ summoner }: { summoner: SummonerModelState }) => ({
  summoner,
}))(Summoner);
