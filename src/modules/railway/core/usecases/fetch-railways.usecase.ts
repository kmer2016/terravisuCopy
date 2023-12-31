import { Dependencies } from "../../../store/dependencies";
import { AppDispatch, AppGetState } from "../../../store/store";
import { extractErrorMessage } from "../../../utils/error.utils";
import { railwailSlice } from "../store/railway.slice";

export const fetchRailways = async (
    dispatch:AppDispatch,
    _:AppGetState,
    dependencies:Dependencies
    ) => {
        dispatch(railwailSlice.actions.handleRailwaysLoading());
        try {
            const railways = await dependencies.railwayGateway.getRailways();
            dispatch(railwailSlice.actions.storeRailways(railways));
        } catch (error) {
            dispatch(railwailSlice.actions.handleRailwaysError(extractErrorMessage(error)));
        }
}