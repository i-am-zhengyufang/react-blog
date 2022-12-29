import { Effect, Reducer, Subscription } from 'umi';
import * as CateApi from 'services/category'


export interface CateState {
    list: Category.CateProps[]
}

export interface CateModelType {
    namespace: 'category';
    state: CateState;
    reducers: {
        setList: Reducer<CateState>;
    };
    effects: {
        fecth: Effect;
        add: Effect;
        update: Effect;
        del: Effect;
    };
    subscriptions: { setup: Subscription };
}

const CateModel: CateModelType = {
    namespace: 'category',
    state: {
        list: []
    },
    // reducers 中用来设置修改 state 的方法：修改 state 的方式是需要返回一个新的对象,即新state
    reducers: {
        setList(state, action): CateState {
            return { list: action.payload }
        }
    },
    effects: {
        *fecth({ }, { call, put, select }) {
            const payload = yield call(CateApi.getList)
            yield put({ type: 'setList', payload })
            // 验证：
            // const res = yield select((state: any) => state.category.list)
            // console.log(res);
        },
        *add({ payload: { name } }, { call }) {
            return yield call(CateApi.addList, { name })
        },
        *update({ payload: { id, name } }, { call }) {
            return yield call(CateApi.updateList, { id, name })
        },
        *del({ payload: { id } }, { call }) {
            return yield call(CateApi.delList, { id })
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/home') {
                    dispatch({
                        type: 'fecth',
                    });
                }
            })
        }
    }
}

export default CateModel
