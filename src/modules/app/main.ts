import { Dependencies } from "../store/dependencies";
import { AppStore, createStore } from "../store/store";

export class App {
    public store:AppStore
    public dependencies:Dependencies

    constructor(){
        this.store = createStore({dependencies:this.dependencies});
    }
}

export const app = new App();