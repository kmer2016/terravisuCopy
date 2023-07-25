import './RailwayMap.css'
import * as React from "react";
import { LegendItem, useRailway } from "./use-railway.hook";
import { RailwayDomainModel } from '../../core/model/railway.domain-model';


const Legend:React.FC<{items:LegendItem[], hiddenLegendItems:RailwayDomainModel.RailwayStatus[], handleLegendItemClick:(label:RailwayDomainModel.RailwayStatus) => void}> = ({items, handleLegendItemClick, hiddenLegendItems}) => {
  return (
    <div className="legend">
          <h3>Légende :</h3>
          <ul>
            {items.map(item => (
              <li key={item.label} onClick={() => handleLegendItemClick(item.label)}>
                <span className="legend-icon" style={{ backgroundColor: item.color }} />
                <span className={hiddenLegendItems.includes(item.label) ? 'hidden-item' : ''}>
                  {item.label}
                </span>
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
      {presenter.showLegend && <Legend items={presenter.legendItems} hiddenLegendItems={presenter.hiddenLegendItems} handleLegendItemClick={presenter.handleLegendItemClick}></Legend>}
      <button id="zoomto" className="btn" onClick={presenter.onFetchData}>Fetch data</button>
    </>

  )

}