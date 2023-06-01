import { Outlet, Link } from "react-router-dom";
import React from "react";


export default function Layout() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <span> </span>
        <Link to="/todoapp">To do App</Link>
        <span> </span>
      </nav>

      <Outlet />
     
    </>
  );
}
