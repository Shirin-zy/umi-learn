import item from '@/pages/item';
import { Effect, Reducer, Subscription, request } from 'umi';

export interface Item {
  des1: string;
  item_id: number;
  item_name: string;
  item_type: number;
  price: number;
  total_price: number;
}

export interface ItemModelState {
  items: Item[];
  filterKey: number;
}

export interface ItemModelType {
  namespace: 'item';
  state: ItemModelState;
  effects: {
    query: Effect;
    fetch: Effect;
  };
  reducers: {
    save: Reducer<ItemModelState>;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const ItemModel: ItemModelType = {
  namespace: 'item',

  state: {
    items: [],
    filterKey: 0,
  },

  effects: {
    *query({ payload }, { call, put, select }) {},
    *fetch({ payload }, { call, put }) {
      const itemData = yield request('/web201605/js/item.json');
      const localData = [
        {
          des1: '<p>+20物理攻击</p>',
          item_name: '铁剑',
          item_type: 1,
          price: 150,
          total_price: 250,
        },
      ];
      yield put({
        type: 'save',
        payload: {
          items: itemData || localData,
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        console.log(pathname);
        if (pathname === '/item') {
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
        ...state,
        ...action.payload,
      };
    },
  },
};

export default ItemModel;
