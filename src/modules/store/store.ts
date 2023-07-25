import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { railwayReducer } from "../railway/core/store/railway.slice";
import { Dependencies } from "./dependencies";

export type AppStore = ReturnType<typeof createStore>
export type AppState = ReturnType<typeof reducers>
export type AppDispatch = AppStore["dispatch"];
export type AppGetState = AppStore["getState"];

const reducers = combineReducers({
    railways: railwayReducer 
});

export const createStore = (config:{
    initialState?:AppState;
    dependencies:Dependencies;
}) => {
    const store = configureStore({
        // preloadedState:config?.initialState,
        reducer:reducers,
        devTools:true,
        middleware:(getDefaultMiddleware) => {
            return getDefaultMiddleware({
                thunk:{
                    extraArgument:config.dependencies
                }
            })
        }
    });

    return store;
}
