import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Home.jsx';
import EmployeeList from './EmployeeList.jsx';
import Layout from './Layout.jsx';

const NotFound = () => <h1>Page Not Found</h1>;

export default function NavHeader() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="employees" element={<EmployeeList />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}