import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Dashboard from "./pages/Dashboard.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

//RAINBOW KIT Imports
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { WagmiProvider, http } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { holesky } from "wagmi/chains";
import UnstakePage from "./pages/UnstakePage.jsx";

/* --------------------RAINBOW KIT CONFIGURATION------------------*/

const config = getDefaultConfig({
  appName: "Ostake",
  projectId: "fec0fa295f9afc7177bd38180c7c2c06",
  chains: [holesky],
  transports: {
    [holesky.id]: http(`https://ethereum-holesky-rpc.publicnode.com`),
  },
  ssr: true,
});

const queryClient = new QueryClient();

// --------------------REACT ROUTER ------------------

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/unstake",
    element: <UnstakePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <RouterProvider router={router} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
