import "./App.css";
import PageRoutes from "./routes/PageRoutes";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Provider store={store}>
        <Toaster position="bottom-right" reverseOrder={false} />
        <PageRoutes />
      </Provider>
    </>
  );
}

export default App;
