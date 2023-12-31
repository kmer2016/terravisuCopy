import { IRailwayGateway } from "../gateway/railway.gateway";
import { RailwayDomainModel } from "../model/railway.domain-model";


export class InMemoryRailwayGateway implements IRailwayGateway {
    async getRailways(): Promise<RailwayDomainModel.RailwaysGeometryCollection> {
        try {
            const response = await fetch("/data.geojson");
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            
            const isJson = response.headers.get('content-type').includes('json');
            console.log("isJson", isJson, response.headers.get('content-type'))
            const geojsonDataPromise =  await ( isJson ? response.json() : response.text()
            );
            return geojsonDataPromise as Promise<RailwayDomainModel.RailwaysGeometryCollection>; // Return the GeoJSON data wrapped in a Promise
          } catch (error) {
            console.error('Error fetching GeoJSON:', error);
            throw error; // Re-throw the error to be caught by the caller if needed
          }
    }
    
}