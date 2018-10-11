import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers/rootReducer";

export default () => createStore(rootReducer, composeWithDevTools());
