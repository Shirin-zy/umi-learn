import { Effect, Reducer, Subscription, request } from 'umi';

// 利用接口定义每一项的数据类型
export interface Hero {
  ename: number;
  cname: string;
  title: string;
  new_type: number;
  hero_type: number;
  skin_name: string;
}

// 定义该数据mdele的state数据状态的类型
export interface HeroModelState {
  name: string;
  heros: Hero[];
  freeHeros: Hero[];
  filterKey: number;
  itemHover: number;
}

// 定义该model的类型接口
export interface HeroModelType {
  namespace: string;
  state: HeroModelState;
  effects: {
    query: Effect;
    fetch: Effect;
  };
  reducers: {
    save: Reducer<HeroModelState>;
  };
  subscriptions: {
    setup: Subscription;
  };
}

// 实现该数据model接口
const HeroModel: HeroModelType = {
  // 命名空间
  namespace: 'hero',

  // 数据状态
  state: {
    name: 'hero',
    heros: [],
    freeHeros: [],
    filterKey: 0,
    itemHover: 0,
  },

  // 修改数据的异步方法，通过提交action进行修改
  effects: {
    *query({ payload }, { call, put, select }) {},
    *fetch({ type, payload }, { call, put, select }) {
      console.log('fetch effect called');
      const data = yield request('/web201605/js/herolist.json');
      const freeheros = yield request('/mock/freeheros.json', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          number: 19,
        }),
      });
      // const data = yield request('/herodetails.json', {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json; charset=utf-8',
      //   },
      //   body: JSON.stringify({
      //     ename: 110,
      //   }),
      // });
      // const data = yield call(request, '/web201605/js/herolist.json');
      const localData = [
        {
          ename: 105,
          cname: '廉颇',
          title: '正义爆轰',
          new_type: 0,
          hero_type: 3,
          skin_name: '正义爆轰|地狱岩魂',
        },
        {
          ename: 106,
          cname: '小乔',
          title: '恋之微风',
          new_type: 0,
          hero_type: 2,
          skin_name: '恋之微风|万圣前夜|天鹅之梦|纯白花嫁|缤纷独角兽',
        },
      ];
      yield put({
        type: 'save',
        payload: {
          heros: data || localData,
          freeHeros: freeheros,
        },
      });
    },
  },

  // 修改数据的同步方法，也是唯一修改数据状态的地方，effect通过提交action修改，本身并不修改数据
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },

  // 订阅，当发生改变时进行修改数据
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        console.log(pathname);
        if (pathname === '/hero') {
          dispatch({
            type: 'fetch',
          });
        }
      });
    },
  },
};

export default HeroModel;
