import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import { createRoot } from 'react-dom/client';
import EmployeeList from './EmployeeList.jsx';

const element = <EmployeeList />;

createRoot(document.getElementById("employee-contents")).render(element);
