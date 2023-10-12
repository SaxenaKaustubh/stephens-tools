import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Wrapper from "./components/Wrapper";
import AppProvider from "./libs/context/AppProvider";
import StatusMessage from "./components/StatusMessage";
import { ThemeProvider } from "@fluentui/react";
import { AppContainer } from "react-hot-loader";

function App() {
  return (
    <AppContainer>
      <AppProvider>
        <ThemeProvider>
          <Wrapper>
            <Router basename="/">
              <Switch>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </Router>
          </Wrapper>
          <StatusMessage />
        </ThemeProvider>
      </AppProvider>
    </AppContainer>
  );
}

export default App;
