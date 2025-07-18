import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, WagmiProvider, createConfig } from "wagmi";
import { liskSepolia } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

const config = createConfig({
    ssr: true, // Make sure to enable this for server-side rendering (SSR) applications.
    chains: [liskSepolia],
    connectors: [metaMask()],
    transports: {
        [liskSepolia.id]: http(),
    },
});

const client = new QueryClient();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <WagmiProvider config={config}>
            <QueryClientProvider client={client}>
                <App />
            </QueryClientProvider>
        </WagmiProvider>
    </StrictMode>
);
