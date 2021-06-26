import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./pages/Home";
import { Information } from "./components/Information";

import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route path="/" component={Home}/>
        <Route path="/information" component={Information}/>

      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
