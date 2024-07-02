import "@mantine/core/styles.css";
import { createCtx } from "@reatom/framework";
import { reatomContext } from "@reatom/npm-react";
import { RouterProvider } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./routes.tsx";

const ctx = createCtx();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <reatomContext.Provider value={ctx}>
      <RouterProvider router={router} />
    </reatomContext.Provider>
  </React.StrictMode>,
);
