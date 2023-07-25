import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RailwayDomainModel } from "../model/railway.domain-model";


export const initialState:RailwayDomainModel.RailwaysGeometryCollection | null = null;

export const railwailSlice = createSlice({
    name:"railways",
    initialState,
    reducers:{
        storeRailways:(_, action:PayloadAction<RailwayDomainModel.RailwaysGeometryCollection>) => {
            return action.payload
        }
    }
});

export const railwayReducer = railwailSlice.reducer;
export const railwayActions = railwailSlice.actions;