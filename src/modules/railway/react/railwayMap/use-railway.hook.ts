import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/store";
import { selectRailways } from "../../core/selectors/railway.selector";
import { fetchRailways } from "../../core/usecases/fetch-railways.usecase";
import { Map } from 'maplibre-gl';

export const useRailway = () => {
    const railways = useSelector(selectRailways);
    const mapContainer = useRef(null);
    const [map, setMap] = useState<Map | null>(null);

    function onFetchData(){
        dispatch(fetchRailways)
    }

    useEffect(() => {
        // Get your Geoapify API key on https://www.geoapify.com/get-started-with-maps-api
        // The Geoapify service is free for small projects and the development phase.
        const myAPIKey = '2deb191468ab488fa54c41b0c73d0a2b';
        const mapStyle = 'https://maps.geoapify.com/v1/styles/osm-carto/style.json';
    
        const initialState = {
          lng: 2.209,
          lat: 46.23,
          zoom: 5,
        };
        
        setMap(new Map({
          container: mapContainer.current,
          style: `${mapStyle}?apiKey=${myAPIKey}`,
          center: [initialState.lng, initialState.lat],
          zoom: initialState.zoom,
        }))
    
    
        return () => map?.remove();
      }, []);

      useEffect(() => {
        if(railways == null) return
        map.addSource('railways', {
            type:"geojson",
            data:railways
        })

        map.addLayer({
            'id': 'railways',
            'type': 'line',
            'source': 'railways',
            'paint': {
                'line-width': 3,
                // Use a get expression (https://maplibre.org/maplibre-style-spec/expressions/#get)
                // to set the line-color to a feature property value.
                'line-color': ['get', 'color']
            }
        });
      }, [railways])

    const dispatch = useAppDispatch();

    return { railways, mapContainer,  map, onFetchData}
}