import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AppWrapper } from './modules/app/react/AppWrapper'
import { RailwayMap } from './modules/railway/react/map/RailwayMap'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWrapper>
        <RailwayMap></RailwayMap>
        </AppWrapper>
  </React.StrictMode>,
)
