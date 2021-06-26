import { BrowserRouter, Route, Switch } from "react-router-dom";
import { InfoProvider } from "./utils/InfoContext";

import { Home } from "./pages/Home";
import { Test } from "./pages/Test";
import { Information } from "./pages/Information";

import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <InfoProvider>  
          <Switch>
            <Route path="/information" component={Information}/>
            <Route path="/test" component={Test}/>
            <Route path="/" component={Home}/>
          </Switch>
        </InfoProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
