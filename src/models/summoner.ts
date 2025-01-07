import item from '@/pages/item';
import summoner from '@/pages/summoner';
import { Effect, Reducer, Subscription, plugin, request } from 'umi';

export interface summonerItem {
  summoner_description: string;
  summoner_id: number;
  summoner_name: string;
  summoner_rank: string;
}

export interface SummonerModelState {
  summoners: summonerItem[];
}

export interface SummonerModelType {
  namespace: 'summoner';
  state: SummonerModelState;
  effects: {
    query: Effect;
    fetch: Effect;
  };
  reducers: {
    save: Reducer<SummonerModelState>;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const SummonerModel: SummonerModelType = {
  namespace: 'summoner',

  state: {
    summoners: [],
  },

  effects: {
    *query({ payload }, { call, put }) {},
    *fetch({ payload }, { call, put, select }) {
      const summonerData = yield request('/web201605/js/summoner.json');
      const localData = [
        {
          summoner_description:
            '30秒CD：对身边的野怪和小兵造成真实伤害并眩晕1秒',
          summoner_id: 80104,
          summoner_name: '惩击',
          summoner_rank: 'LV.1解锁',
        },
      ];
      yield put({
        type: 'save',
        payload: {
          summoners: summonerData || localData,
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        console.log(pathname);
        if (pathname === '/summoner') {
          dispatch({
            type: 'fetch',
          });
        }
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...action,
        ...action.payload,
      };
    },
  },
};

export default SummonerModel;
