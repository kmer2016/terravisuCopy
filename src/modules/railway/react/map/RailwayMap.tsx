import { useRef, useEffect } from "react";
import { Map } from 'maplibre-gl';

import './RailwayMap.css'
import * as React from "react";

export const RailwayMap:React.FC = () => {
    const mapContainer = useRef(null);

  useEffect(() => {
    // This API key is for use only in stackblitz.com
    // Get your Geoapify API key on https://www.geoapify.com/get-started-with-maps-api
    // The Geoapify service is free for small projects and the development phase.
    const myAPIKey = '2deb191468ab488fa54c41b0c73d0a2b';
    const mapStyle = 'https://maps.geoapify.com/v1/styles/osm-carto/style.json';

    const initialState = {
      lng: 2.209,
      lat: 46.23,
      zoom: 5,
    };
    
    const map = new Map({
      container: mapContainer.current,
      style: `${mapStyle}?apiKey=${myAPIKey}`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });


    return () => map.remove();
  });

  return <div className="map-container" ref={mapContainer}></div>;
}