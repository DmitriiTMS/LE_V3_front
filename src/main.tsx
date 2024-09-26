import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { Toaster } from "react-hot-toast";

import App from "./App.tsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: 1000,
      // refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <Toaster position="bottom-left" reverseOrder={false} toastOptions={{
            duration: 3000
          }} />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
