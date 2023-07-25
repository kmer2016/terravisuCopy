import { IRailwayGateway } from "../core/gateway/railway.gateway";
import { RailwayDomainModel } from "../core/model/railway.domain-model";

export class StubRailwayGateway implements IRailwayGateway {
    constructor(private data: RailwayDomainModel.RailwaysGeometryCollection = null) {}
    getRailways(): Promise<RailwayDomainModel.RailwaysGeometryCollection> {
        return Promise.resolve(this.data);
    }
  }