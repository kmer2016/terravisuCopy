import { describe, expect, it } from "vitest"
import { createTestStore } from "../../../testing/tests-environment";
import { FailingTableGateway } from "../../testing/failing.table-gateway";
import { StubRailwayGateway } from "../../testing/stub.railway-gateway";
import { RailwayFactory } from "../model/railway.factory"
import { fetchRailways } from "./fetch-railways.usecase";

describe("Fetch railways", () => {
    it("should fetch the railways", async () => {
        const railways = RailwayFactory.create();

        const store = createTestStore({
            dependencies:{
                railwayGateway: new StubRailwayGateway(railways)
            }
        })

        const promise = store.dispatch(fetchRailways);

        expect(store.getState().railways.status).toEqual("loading");

        await promise;

        expect(store.getState().railways.data).toEqual(railways)
        expect(store.getState().railways.status).toEqual("success");
    })

    it("should handle railway fetching failure", async () => {
        const store = createTestStore({
            dependencies: {
              railwayGateway: new FailingTableGateway(),
            },
          });
      
          const promise = store.dispatch(fetchRailways);
      
          expect(store.getState().railways.status).toEqual("loading");
      
          await promise;
      
          expect(store.getState().railways.data).toEqual(null);
          expect(store.getState().railways.status).toEqual("error");
          expect(store.getState().railways.error).toEqual(
            "Failed to fetch data"
          );
    })
})