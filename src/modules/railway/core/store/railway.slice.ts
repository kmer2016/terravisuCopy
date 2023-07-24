import { createSlice } from "@reduxjs/toolkit";
import { RailwayDomainModel } from "../model/railway.domain-model";


export const initialState:RailwayDomainModel.RailwaysGeometryCollection | null = null;

export const railwailSlice = createSlice({
    name:"railways",
    initialState,
    reducers:{}
});

export const railwayReducer = railwailSlice.reducer;
export const railwayActions = railwailSlice.actions;