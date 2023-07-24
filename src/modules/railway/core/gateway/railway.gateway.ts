import { RailwayDomainModel } from "../model/railway.domain-model";

export interface IRailwayGateway {
    getRailways():Promise<RailwayDomainModel.RailwaysGeometryCollection>
}