import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./pages/Home";
import { Information } from "./pages/Information";

import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route path="/information" component={Information}/>
        <Route path="/" component={Home}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
