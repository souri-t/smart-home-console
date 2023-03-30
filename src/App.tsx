import React from 'react';
import './App.css';
import Layout from './layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RemotePage from "./RemotePage";

function App() {
  return (
    <div className="App">
      <Layout>
        <div className='m-2'>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<RemotePage />} />
              <Route path="/remote" element={<RemotePage />} />
            </Routes>
          </BrowserRouter>
        </div>
    </Layout>
    </div>
  );
}

export default App;
