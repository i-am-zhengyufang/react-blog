import { Effect, Reducer, Subscription } from 'umi';
import * as TagApi from 'services/tag'
// cv cate即可

export interface TagState {
    list: Tag.TagProps[]
}

export interface TagModelType {
    namespace: 'tag';
    state: TagState;
    reducers: {
        setList: Reducer<TagState>;
    };
    effects: {
        fecth: Effect;
        add: Effect;
        update: Effect;
        del: Effect;
    };
    subscriptions: { setup: Subscription };
}

const TagModel: TagModelType = {
    namespace: 'tag',
    state: {
        list: []
    },
    // reducers 中用来设置修改 state 的方法：修改 state 的方式是需要返回一个新的对象,即新state
    reducers: {
        setList(state, action): TagState {
            return { list: action.payload }
        }
    },
    effects: {
        *fecth({ }, { call, put, select }) {
            const payload = yield call(TagApi.getList)
            yield put({ type: 'setList', payload })
        },
        *add({ payload: { name } }, { call }) {
            return yield call(TagApi.addList, { name })
        },
        *update({ payload: { id, name } }, { call }) {
            return yield call(TagApi.updateList, { id, name })
        },
        *del({ payload: { id } }, { call }) {
            return yield call(TagApi.delList, { id })
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

export default TagModel
