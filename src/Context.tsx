import React, { Dispatch, ReducerAction } from "react";
import rootReducer from "./reducers";
export default React.createContext({ stateTree: {}, dispatch: {} } as {
    stateTree: ReturnType<typeof rootReducer>;
    dispatch: Dispatch<ReducerAction<typeof rootReducer>>;
});
