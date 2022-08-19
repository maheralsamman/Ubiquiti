import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { IsDevice, IsDeviceObject } from './interfaces/interfaces';
import { getDevices } from './functions/functions';
import Header from './components/Header';
import Navigation from './components/Navigation';
import List from './components/List';
import Grid from './components/Grid';
import OneDevice from './components/OneDevice';

const App = () => {
  const [devices, setDevices] = useState<IsDevice[]>();
  const [device, setDevice] = useState<IsDeviceObject[]>();
  const [filter, setFilter] = useState<IsDevice[]>();
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    getDevices(setDevices, setFilter);
  }, []);

  return (
    <>
      <Header />
      <Navigation
        showGrid={showGrid}
        setFilter={setFilter}
        setShowGrid={setShowGrid}
        devices={devices}
        device={device}
      />
      <Routes>
        {showGrid
          ? <Route path="/" element={<Grid devices={filter} />} />
          : <Route path="/" element={<List devices={filter} />} />}
        <Route
          path="/device/:shortname"
          element={(
            <OneDevice
              devices={devices}
              device={device}
              setDevice={setDevice}
            />
                )}
        />
      </Routes>
    </>
  );
};

export default App;
