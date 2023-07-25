import { useEffect, useRef } from "react";
import { useSelector} from "react-redux";
import { selectRailways } from "../../core/selectors/railway.selector";
import { Map } from 'maplibre-gl';
import { useAppDispatch } from "../../../store/store";
import { fetchRailways } from "../../core/usecases/fetch-railways.usecase";




export const useRailway = () => {
    const railways = useSelector(selectRailways);
    const mapContainer = useRef(null);
    const map = useRef(null);
    const dispatch = useAppDispatch()



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
        
        map.current = new Map({
          container: mapContainer.current,
          style: `${mapStyle}?apiKey=${myAPIKey}`,
          center: [initialState.lng, initialState.lat],
          zoom: initialState.zoom,
        })
    
    
        return () => map?.current?.remove();
      }, []);

      useEffect(() => {
                
        if(railways?.data == null) return

        
        map.current.addSource('railways', {
            type:"geojson",
            data:railways.data
        })

        map.current.addLayer({
            'id': 'railways',
            'type': 'line',
            'layout': {
              'line-join': 'round',
              'line-cap': 'round'
            },
            'source': 'railways',
            'paint': {
                'line-width': 2,
                // Use a get expression (https://maplibre.org/maplibre-style-spec/expressions/#get)
                // to set the line-color to a feature property value.
                'line-color': [
                  'match',
                  ["get", "mnemo"],
                  'PROJET', 'blue',
                  'EXPLOITE', 'green',
                  'NEUT', 'gray',
                  'NEUT DEF', 'yellow',
                  'VS', 'red',
                  'FERME ND', 'purple',
                  'FERME MV', 'orange',
                  'FERME D', 'brown',
                  'FERME', 'pink',
                  'FERME DT', 'cyan',
                  'RETRANCHE', 'magenta',
                  'DEC NV', 'lightblue',
                  'DEC V', 'lightgreen',
                  'black'
                ]
            }
        });
      }, [map, railways.data])

    return { railways, mapContainer,  map, onFetchData}
}