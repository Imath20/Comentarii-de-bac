import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/index';
import Scriitori from './pages/scriitori';
import Subiecte from './pages/subiecte';
import './styles/style.scss';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scriitori" element={<Scriitori />} />
      <Route path="/subiecte" element={<Subiecte />} />
    </Routes>
  );
}
