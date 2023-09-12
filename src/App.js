import React from 'react';
import { Routes, Route } from "react-router-dom"
import WatchListDashboardScreen from './pages/watchListDashboard';
import WatchListSearchScreen from './pages/watchListSearch';
import { GetGroupsResponseHeader, HandleWatchListResponse, HandleSearchSymbols, HandleTheme } from './utils/device-interface';
import './App.css';

function App() {
  GetGroupsResponseHeader(); // 
  HandleWatchListResponse();
  HandleSearchSymbols();
  HandleTheme();

  return (
    // <div className="App">
    <Routes>
      <Route path="/" element={<WatchListDashboardScreen />} />
      <Route path="/search" element={<WatchListSearchScreen />} />
    </Routes>
    // </div>
  );
}

export default App;
