import { compose, createStore } from "redux";

import rootReducer from "./reducer";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers());

export type RootState = ReturnType<typeof rootReducer>