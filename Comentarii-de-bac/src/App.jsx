import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/index';
import Scriitori from './pages/scriitori';
import Subiecte from './pages/subiecte';
import Opre from './pages/opere';
import Biblioteca from './pages/biblioteca';
import Scriitoripage from './pages/Scriitor';
import BookReader from './pages/BookReader';
import Videoclipuri from './pages/videoclipuri';
import AI from './pages/ai';
import './styles/style.scss';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scriitori" element={<Scriitori />} />
      <Route path="/subiecte" element={<Subiecte />} />
      <Route path="/opere" element={<Opre />} />
      <Route path="/biblioteca" element={<Biblioteca />} />
      <Route path="/scriitor" element={<Scriitoripage />} />
      <Route path="/videoclipuri" element={<Videoclipuri />} />
      <Route path="/ai" element={<AI />} />
      <Route path="/carte/*" element={<BookReader />} />
    </Routes>
  );
}
