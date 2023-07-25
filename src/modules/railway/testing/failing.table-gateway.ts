import { IRailwayGateway } from "../core/gateway/railway.gateway";

export class FailingTableGateway implements IRailwayGateway{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async getRailways():Promise<any>{
        throw new Error("Failed to fetch data");
    }
}