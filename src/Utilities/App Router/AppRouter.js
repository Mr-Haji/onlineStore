import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouteList } from "../../Utilities/Route List/RouteList";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {RouteList.map((e, i) => {
          return <Route key={i} path={e.path} element={e.element} />;
        })}
      </Routes>
    </Router>
  );
};

export default AppRouter;