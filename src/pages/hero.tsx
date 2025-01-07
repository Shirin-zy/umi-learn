import React, { FC } from 'react';
import styles from './hero.less';
import { connect, HeroModelState, ConnectProps } from 'umi'; //step1 在文件头部引入了 umi 的connect,HeroModelState, ConnectProps
import { Row, Col, Radio, Card } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio/interface';
import { useHistory } from 'umi';
import FreeHeroItem from '@/components/FreeHeroItem';
import item from './item';

// 定义页面接收参数的接口，它继承自ConnectProps并扩展了一个hreo属性
interface PageProps extends ConnectProps {
  hero: HeroModelState;
}

const heroType = [
  { key: 0, value: '全部' },
  { key: 1, value: '战士' },
  { key: 2, value: '法师' },
  { key: 3, value: '坦克' },
  { key: 4, value: '刺客' },
  { key: 5, value: '射手' },
  { key: 6, value: '辅助' },
];

//step2 把之前的匿名函数，改成实名函数Hero
const Hero: FC<PageProps> = (props) => {
  //  step4从属性中取出namespace为hero的model的state数据
  // 利用解构赋值从props拿到对应参数
  const { dispatch, hero } = props;
  // 在解构赋值中设置默认值
  const { heros = [], filterKey = 0, freeHeros = [], itemHover = 0 } = hero;
  const RadioGroup = Radio.Group;
  const history = useHistory();
  // 单选框发送改变时将状态同步到model
  const onChange = (e: RadioChangeEvent) => {
    console.log(e.target.value);
    dispatch!({
      type: 'hero/save',
      payload: {
        filterKey: e.target.value,
      },
    });
  };

  //点击角色跳转至详情页
  const showDetail = (ename: number) => {
    history.push(`/herodetail/${ename}`);
  };

  // 接收当前悬停元素的index在model进行设置展开元素index
  const resetHoverIndex = (index) => {
    dispatch!({
      type: 'hero/save',
      payload: {
        itemHover: index,
      },
    });
  };
  return (
    <div className={styles.normal}>
      <div className={styles.info}>
        <Row className={styles.freehero}>
          <Col span={24}>
            <p>周免英雄</p>
            <div>
              {freeHeros.map((item, index) => (
                <FreeHeroItem
                  data={item}
                  itemHover={itemHover}
                  resetHoverIndex={resetHoverIndex}
                  thisIndex={index}
                  key={index}
                />
              ))}
            </div>
          </Col>
        </Row>
      </div>
      <Card className={styles.radioPanel}>
        <RadioGroup onChange={onChange} value={filterKey}>
          {heroType.map((data) => (
            <Radio value={data.key} key={`hero-rodio-${data.key}`}>
              {data.value}
            </Radio>
          ))}
        </RadioGroup>
      </Card>
      <Row>
        {heros
          .filter((item) => filterKey === 0 || item.hero_type === filterKey)
          .reverse()
          .map((item) => (
            <Col key={item.ename} span={3} className={styles.heroitem}>
              <img
                onClick={() => showDetail(item.ename)}
                src={`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${item.ename}/${item.ename}.jpg`}
              />
              <p>{item.cname}</p>
            </Col>
          ))}
      </Row>
    </div>
  );
};
// step3 使用connect连接页面和models
export default connect(({ hero }: { hero: HeroModelState }) => ({ hero }))(
  Hero,
);
