import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { railwayReducer } from "../railway/core/store/railway.slice";

export type AppStore = ReturnType<typeof createStore>
export type AppState = ReturnType<typeof reducers>
export type AppDispatch = AppStore["dispatch"];
export type AppGetState = AppStore["getState"];

const reducers = combineReducers({
    railways: railwayReducer 
});

export const createStore = () => {
    const store = configureStore({
        reducer:reducers,
        devTools:true
    });

    return store;
}
