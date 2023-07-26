import React, { lazy } from 'react';
import { Routes, Route } from "react-router-dom"
import logo from './logo.svg';
import './App.css';
import Child from './child';
import SearchComp from './childone';
import { GetGroupsResponseHeader, HandleWatchListResponse, HandleSearchSymbols } from './utils/device-interface';
// const Childone = React.lazy(() => import('./childone'))

function App() {
  GetGroupsResponseHeader(); // 
  HandleWatchListResponse();
  HandleSearchSymbols();

  return (
    // <div className="App">
    <Routes>
      <Route path="/" element={<Child />} />
      <Route path="/search" element={<SearchComp />} />
    </Routes>
    // </div>
  );
}

export default App;
