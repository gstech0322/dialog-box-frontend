import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./store/actions";
import "./styles/app.sass";
import Home from "./screens/Home";
import Collection from "./screens/Collection";
import About from "./screens/About";
import Charity from "./screens/Charity";
import CreateItem from "./screens/CreateItem";
import CreateDetails from "./screens/CreateDetails";
import ConnectWallet from "./screens/ConnectWallet";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./screens/Dashboard";

function App() {

  const dispatch = useDispatch();

  const auth = useSelector(state => state.authReducer.data);
  
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
        console.log("eth_accounts:", accounts);
        if (accounts.length > 0) {
          const address = accounts[0].toUpperCase();
          dispatch(Actions.getAuth(address));
        }
      })
      window.ethereum.on('accountsChanged', function (accounts) {
        console.log("accountsChanged:", accounts);
        if (accounts.length === 0) {
          dispatch(Actions.getAuth());
        } else {
          const address = accounts[0].toUpperCase();
          dispatch(Actions.getAuth(address));
        }
      })
    }
  }, []);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/about" render={() => <About />} />
        <Route exact path="/charity" render={() => <Charity />} />
        <Route exact path="/dashboard" render={() => (
          Object.keys(auth).length > 0 && auth.address !== 'undefined' && auth.role === "admin" ?
            <Dashboard />
            :
            <Home />
        )}
        />
        <Route exact path="/connect-wallet" render={() => <ConnectWallet />} />
        <Route exact path="/collection/:id" render={() => <Collection />} />
        <Route exact path="/create" render={() => <CreateItem />} />
        <Route exact path="/create-details" render={() => (
          Object.keys(auth).length > 0 && auth.address !== 'undefined' && auth.role === "admin" ?
            <CreateDetails />
            :
            <Home />
        )}
        />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;