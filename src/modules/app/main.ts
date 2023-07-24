import { AppStore, createStore } from "../store/store";

export class App {
    public store:AppStore

    constructor(){
        this.store = createStore();
    }
}

export const app = new App();