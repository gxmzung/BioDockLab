import React from "react";
import { createRoot } from "react-dom/client";
import BioDashboard from "../../frontend/BioDashboard";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BioDashboard />
  </React.StrictMode>
);
