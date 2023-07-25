import { InMemoryRailwayGateway } from "../railway/core/gateway-infra/in-memory.railway-gateway";
import { Dependencies } from "../store/dependencies";
import { AppStore, createStore } from "../store/store";

export class App {
    public store:AppStore
    public dependencies:Dependencies

    constructor(){
        this.dependencies = this.setupDependencies();
        this.store = createStore({dependencies:this.dependencies});
    }

    setupDependencies(): Dependencies {
        return {
    
          railwayGateway:new InMemoryRailwayGateway()
        };
      }
}

export const app = new App();