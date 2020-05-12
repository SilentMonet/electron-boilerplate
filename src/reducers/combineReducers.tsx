interface Action {
    type: string
}

interface AnyAction extends Action {
    [props: string]: any
}

type Reducer<S = any, A = AnyAction> = (
    state: S,
    action: A
) => S

//描述Reducers对象
type ReducersMapObject<S = any, A extends Action = Action> = {
    [K in keyof S]: Reducer<S[K], A>
}
//由Reducers对象获取State对象的描述
type StateFromReucers<M> = {
    [P in keyof M]: M[P] extends Reducer<infer S, any> ? S : never
}
//描述由Reducers对象产生的rootReducer函数
type ReducerFromReducers<M> = M extends { [P in keyof M]: infer R } ? R extends Reducer<any, any> ? R : never : never;
//由Reducer函数获取该Reducer函数接收的Action类型
type ActionFromReducer<R> = R extends Reducer<any, infer A> ? A : never;
///由Reducers对象获取rootReducer可接受的Action类型
type ActionFromReducers<M> = M extends ReducersMapObject<any, any> ? ActionFromReducer<ReducerFromReducers<M>> : never;

export default function combineReducers<M extends ReducersMapObject<any, any>>(reducers: M): Reducer<StateFromReucers<M>, ActionFromReducers<M>>

export default function combineReducers(reducers: ReducersMapObject) {
    return function (state: StateFromReucers<typeof reducers>, action: ActionFromReducers<typeof reducers>) {
        const nextState: StateFromReucers<typeof reducers> = {};
        const keys = Object.keys(reducers);
        let hasChanged = false;
        for (let key of keys) {
            nextState[key] = reducers[key](state[key], action);
            hasChanged=hasChanged||nextState[key]!==state[key]
        }
        return hasChanged?nextState:state
    }
}
