import './RailwayMap.css'
import * as React from "react";
import { useRailway } from "./use-railway.hook";

export const RailwayMap:React.FC = () => {
    
    const presenter = useRailway();

  return <>
  <button id="zoomto" className="btn" onClick={presenter.onFetchData}>Fetch data</button>
  <div className="map-container" ref={presenter.mapContainer}></div>;
  </>

}