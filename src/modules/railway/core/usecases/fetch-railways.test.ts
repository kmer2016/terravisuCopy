import { describe, expect, it } from "vitest"
import { createTestStore } from "../../../testing/tests-environment";
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

        await promise;

        expect(store.getState().railways).toEqual(railways)
    })
})