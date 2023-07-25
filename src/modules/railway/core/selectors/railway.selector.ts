import { AppState } from "../../../store/store";
import { RailwayDomainModel } from "../model/railway.domain-model"

export const selectRailways = (state:AppState) => state.railways

export const selectRailwaysByStatus = (state:AppState, status:RailwayDomainModel.RailwayStatus) => {
    if(state.railways == null) return null;
    return state.railways.data.features.filter(feature => feature.properties.mnemo === status)
}