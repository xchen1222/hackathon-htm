import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./pages/Home";
import { Bitcoin } from "./pages/Bitcoin";
import { Dogecoin } from "./pages/Dogecoin";
import { Ethereum } from "./pages/Ethereum";

import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route path="/" component={Home}/>
        <Route path="/bitcoin" component={Bitcoin}/>
        <Route path="/dogecoin" component={Dogecoin}/>
        <Route path="/ethereum" component={Ethereum}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
