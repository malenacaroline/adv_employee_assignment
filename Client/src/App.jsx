import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import NavHeader from './NavHeader.jsx';

const element = (
  <BrowserRouter>
    <NavHeader/>
  </BrowserRouter>
);

createRoot(document.getElementById("root")).render(element);
