import { createStore } from "redux";

import rootReducer from "./reducer";

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
