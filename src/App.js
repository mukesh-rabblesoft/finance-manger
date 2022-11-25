import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  NotFoundRoute,
} from "react-router-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { getLoggedInStatus } from "./components/utils/Auth";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Reset from "./pages/Reset";
import Forgot from "./pages/Forgot";
import Active from "./pages/Active";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import TwoFactorEnable from "./components/AuthenticateEnable/TwoFactorEnable";
import AuthVarificationForm from "./components/AuthVerification/AuthVarificationForm";

const App = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  useEffect(()=>{
    setIsLoggedin(getLoggedInStatus());
  }, [isLoggedin])
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={isLoggedin?<Home />:<Navigate to="/login" />} />
            <Route exact path="/budget" element={isLoggedin?<Home />:<Navigate to="/login" />} />
            <Route exact path="/budget/:name" element={isLoggedin?<Home />:<Navigate to="/login" />} />
            <Route path="/login" element={isLoggedin?<Navigate to="/" />:<Login />} />
            <Route exact path="/enable-authenticate" element={<TwoFactorEnable/>}/>
            {/* <Route exact path="/factor-authenticate" element={<AuthVarificationForm/>} /> */}
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/reset/:unique_code" element={<Reset />} />
            <Route path="/register" element={<Register />} />
            <Route path="/activate/:unique_code" element={<Active />} />            
            <Route path='*' exact element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
