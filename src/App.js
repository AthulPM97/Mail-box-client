import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Inbox from "./components/Inbox/Inbox";
import MailDrafter from "./components/Mail/MailDrafter";
import Navigationbar from "./components/UI/Navigationbar";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

function App() {
  //store
  const isloggedIn = useSelector((state) => state.auth.isloggedIn);

  return (
    <React.Fragment>
      {isloggedIn && <Navigationbar />}
      <Switch>
        <Route path="/" exact>
          {!isloggedIn && <Auth />}
          {isloggedIn && <Redirect to="/home" />}
        </Route>
        <Route path="/home" exact>
          {isloggedIn && <Home />}
          {!isloggedIn && <Redirect to="/" />}
        </Route>
        <Route path="/draft-mail" exact>
          {isloggedIn && <MailDrafter />}
        </Route>
        <Route path="/inbox" exact>
          {isloggedIn && <Inbox />}
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
