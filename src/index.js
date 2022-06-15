import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";

const root = createRoot(document.getElementById("root"));

const AppWrapper = () => {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
};

root.render(<AppWrapper />);
