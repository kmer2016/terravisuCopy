import { RailwayDomainModel } from "./railway.domain-model";

export class RailwayFactory {
    static create(data?:Partial<RailwayDomainModel.RailwaysGeometryCollection>):RailwayDomainModel.RailwaysGeometryCollection {
        return {
            type:"FeatureCollection",
            features:[],
            ...data
        }
    }
}