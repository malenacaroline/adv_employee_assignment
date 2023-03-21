import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        {' | '}
        <Link to="/employees">Employee List</Link>
        {' | '}
        <Link to="/employees/add">Add Employee</Link>
      </nav>
      <Outlet />
    </>
  );
}
