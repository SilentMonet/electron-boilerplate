import React, { useReducer } from "react";
import Context from "../Context";
import rootReducer from "../reducers";

import Test from "./Test";

export default () => {
    const [stateTree, dispatch] = useReducer(rootReducer, { test: "hello" });
    const store = { stateTree, dispatch };
    return (
        <Context.Provider value={store}>
            <div>
                <Test />
            </div>
        </Context.Provider>
    );
};
