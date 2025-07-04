import "./App.css";
import PageRoutes from "./routes/PageRoutes";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store/store";
import { Toaster } from "react-hot-toast";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query-client";

function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Toaster position="bottom-right" reverseOrder={false} />
          <PageRoutes />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
