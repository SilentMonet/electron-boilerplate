import React, { useContext } from "react";
import Context from "../Context";

export default () => {
    const { stateTree, dispatch } = useContext(Context);
    return (
        <p>
            {stateTree.test}
            <button
                onClick={() =>
                    dispatch({ type: "update", s: stateTree.test + 1 })
                }
            >
                U
            </button>
        </p>
    );
};
