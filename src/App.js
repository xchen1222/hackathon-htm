import { BrowserRouter, Route, Switch } from "react-router-dom";
import { InfoProvider } from "./utils/InfoContext";

import { Information } from "./pages/Information";
import { Results } from "./pages/Results";
import { LandingPage } from "./pages/LandingPage";

import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <InfoProvider>  
          <Switch>
            <Route path="/information" component={Information}/>
            <Route path="/results" component={Results}/>
            <Route path="/" component={LandingPage}/>
          </Switch>
        </InfoProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
