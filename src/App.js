import { BrowserRouter, Route, Switch } from "react-router-dom";
import { InfoProvider } from "./utils/InfoContext";

import { Home } from "./pages/Home";
import { Information } from "./pages/Information";
import { Results } from "./pages/Results";

import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <InfoProvider>  
          <Switch>
            <Route path="/information" component={Information}/>
            <Route path="/results" component={Results}/>
            <Route path="/" component={Home}/>
          </Switch>
        </InfoProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
