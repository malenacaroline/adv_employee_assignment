import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Home.jsx';
import EmployeeList from './EmployeeList.jsx';
import EmployeeAdd from './EmployeeAdd.jsx';
import EmployeeDetails from './EmployeeDetails.jsx';
import EmployeeUpdate from './EmployeeUpdate.jsx';
import EmployeeDelete from './EmployeeDelete.jsx';
import Layout from './Layout.jsx';
import EmployeeDetailsWrapper from './EmployeeDetailsWrapper.jsx';

const NotFound = () => <h1>Page Not Found</h1>;

export default function NavHeader() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="employees" element={<EmployeeList />} />
        <Route path="employees/add" element={<EmployeeAdd />} />
        <Route path="employees/:id" element={<EmployeeDetailsWrapper wrappedComponent={EmployeeDetails} />} />
        <Route path="employees/update/:id" element={<EmployeeDetailsWrapper wrappedComponent={EmployeeUpdate} />}/>
        <Route path="employees/delete/:id" element={<EmployeeDelete/>}/>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}