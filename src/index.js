import ReactDOM from "react-dom/client";
import store from "./store";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";

// react bootstrap configuration
import "../node_modules/react-bootstrap/dist/react-bootstrap.min";
import "bootstrap/dist/css/bootstrap.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
