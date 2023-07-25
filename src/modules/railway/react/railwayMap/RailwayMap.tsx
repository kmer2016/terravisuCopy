import './RailwayMap.css'
import * as React from "react";
import { LegendItem, useRailway } from "./use-railway.hook";


const Legend:React.FC<{items:LegendItem[]}> = ({items}) => {
  return (
    <div className="legend">
          <h3>Légende :</h3>
          <ul>
            {items.map(item => (
              <li key={item.label}>
                <span className="legend-icon" style={{ backgroundColor: item.color }} />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
  )
}


  export const RailwayMap:React.FC = () => {
    
  const presenter = useRailway();
  

  return (
    <>
      {<div className="map-container" ref={presenter.mapContainer}></div>}
      {presenter.showLegend && <Legend items={presenter.legendItems}></Legend>}
      <button id="zoomto" className="btn" onClick={presenter.onFetchData}>Fetch data</button>
    </>

  )

}