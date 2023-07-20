import React, { lazy } from 'react';
import { Routes, Route } from "react-router-dom"
import logo from './logo.svg';
import './App.css';
import Child from './child';
import SearchComp from './childone';
// const Childone = React.lazy(() => import('./childone'))

function App() {
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
