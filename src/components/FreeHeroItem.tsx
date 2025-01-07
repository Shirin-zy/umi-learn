import React, { FC } from 'react';
import { Hero } from 'umi';
interface FreeHeroItemProps {
  data: Hero;
  thisIndex: number;
  resetHoverIndex: (thisIndex: number) => void;
  itemHover: number;
}
const FreeHeroItem: FC<FreeHeroItemProps> = ({
  data,
  thisIndex, // 当前对象的index
  resetHoverIndex, // 当鼠标悬停在该对象上是将展开对象更新为当前对象
  itemHover, // 记录展开对象的index
}) => {
  if (!data || !data.ename) return null;

  return (
    <img
      // 如果当鼠标悬元素index不等于被展开的元素的index则重新将当前元素index设为被展开元素
      onMouseEnter={() => {
        itemHover !== thisIndex && resetHoverIndex(thisIndex);
      }}
      style={{
        borderRadius: '5px',
        height: '69px',
        margin: '5px',
        width: itemHover === thisIndex ? '224px' : '69px', // 元素是否被展开是设置宽度不同
      }}
      src={`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${data.ename}/${
        data.ename
      }${itemHover === thisIndex ? '-freehover.png' : '.jpg'}`}
    />
  );
};
export default FreeHeroItem;
