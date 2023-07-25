import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RailwayDomainModel } from "../model/railway.domain-model";


export const initialState: RailwayDomainModel.State = {
    status: "idle",
    data: null,
    error: null
};

export const railwailSlice = createSlice({
    name: "railways",
    initialState,
    reducers: {
        storeRailways: (state, action: PayloadAction<RailwayDomainModel.RailwaysGeometryCollection>) => {
            return { ...state, data:action.payload, status:"success" }
        },
        handleRailwaysLoading: (state) => {
            return { ...state, status: "loading", error: null }
        },
        handleRailwaysError: (state, action: PayloadAction<string>) => {
            return { ...state, status: "error", error: action.payload }
        }
    }
});

export const railwayReducer = railwailSlice.reducer;
export const railwayActions = railwailSlice.actions;