import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "@sass/global.scss";


function App() {

  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
