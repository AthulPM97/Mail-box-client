import { Route, Switch } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>
        <Route path="/home" exact>
          <Home/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
