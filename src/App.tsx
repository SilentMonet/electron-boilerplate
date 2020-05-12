import * as React from "react";
import * as ReactDOM from "react-dom";

import { useReducer } from "react";
import Context from "./Context";
import rootReducer from "./reducers";

import Test from "./pages/Test";

const Root = () => {
    const [stateTree, dispatch] = useReducer(
        rootReducer,
        rootReducer({} as any, { type: "init" } as any)
    );
    const store = { stateTree, dispatch };
    return (
        <Context.Provider value={store}>
            <div>
                <Test />
            </div>
        </Context.Provider>
    );
};

ReactDOM.render(<Root />, document.getElementById("app"));
