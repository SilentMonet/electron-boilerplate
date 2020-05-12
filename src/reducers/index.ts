import combineReducers from "./combineReducers";

function test(state = "test", action: { type: "update"; s: string }) {
    return action.s || state;
}

export default combineReducers({ test });
