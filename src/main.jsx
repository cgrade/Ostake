import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Dashboard from "./pages/Dashboard.jsx";
import { ToastContainer } from "react-toastify";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

//RAINBOW KIT Imports
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  getDefaultConfig,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider, http } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { holesky } from "wagmi/chains";
import UnstakePage from "./pages/UnstakePage.jsx";
import LandingPage from "./pages/LandingPage.jsx";

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
    path: "/app",
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
  {
    path: "/",
    element: <LandingPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    {" "}
    <ToastContainer />
    <React.StrictMode>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: "#a3c3ae",
              accentColorForeground: "black",
              fontStack: "yara",
              borderRadius: "small",
            })}
          >
            <RouterProvider router={router} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </React.StrictMode>
  </>
);
