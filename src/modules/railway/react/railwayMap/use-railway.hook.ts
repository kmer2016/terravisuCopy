import { useEffect, useRef, useState } from "react";
import { useSelector} from "react-redux";
import { selectRailways } from "../../core/selectors/railway.selector";
import { Map } from 'maplibre-gl';
import { useAppDispatch } from "../../../store/store";
import { fetchRailways } from "../../core/usecases/fetch-railways.usecase";
import { RailwayDomainModel } from "../../core/model/railway.domain-model";



export interface LegendItem {
  label: RailwayDomainModel.RailwayStatus;
  color: string;
}

export const useRailway = () => {
    const railways = useSelector(selectRailways);
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [showLegend, setShowLegend] = useState<boolean>(false);
    const dispatch = useAppDispatch()
    const [hiddenLegendItems, setHiddenLegendItems] = useState<RailwayDomainModel.RailwayStatus[]>([]);

    const legendItems:Array<LegendItem> = [
      { label: 'PROJET', color: 'blue' },
      { label: 'EXPLOITE', color: 'green' },
      { label: 'NEUT', color: 'gray' },
      { label: 'NEUT DEF', color: 'yellow' },
      { label: 'VS', color: 'red' },
      { label: 'FERME ND', color: 'purple' },
      { label: 'FERME MV', color: 'orange' },
      { label: 'FERME D', color: 'brown' },
      { label: 'FERME', color: 'pink' },
      { label: 'FERME DT', color: 'cyan' },
      { label: 'RETRANCHE', color: 'magenta' },
      { label: 'DEC NV', color: 'lightblue' },
      { label: 'DEC V', color: 'lightgreen' }
    ];


    function onFetchData(){
        dispatch(fetchRailways)
    }

    function handleLegendItemClick(label:RailwayDomainModel.RailwayStatus){
      if (hiddenLegendItems.includes(label)) {
        setHiddenLegendItems(hiddenLegendItems.filter(item => item !== label));
      } else {
        setHiddenLegendItems([...hiddenLegendItems, label]);
      }
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

        setShowLegend(true)

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

      useEffect(() => {
        if(railways?.data == null) return
        const filteredData = {
          ...railways.data,
          features: railways.data.features.filter(feature => !hiddenLegendItems.includes(feature.properties.mnemo))
        };
        map.current.getSource('railways').setData(filteredData);
      }, [hiddenLegendItems, railways.data])

    return { railways, mapContainer,  map, showLegend, legendItems, hiddenLegendItems, handleLegendItemClick, onFetchData}
}