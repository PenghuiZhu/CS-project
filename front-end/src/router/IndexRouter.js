import React from "react";
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import Login from "../views/login/Login";
import Register from "../views/register/Register";
import GTASandBox from "../views/sandbox/GTASandBox";

export default function IndexRouter() {
  return (
    <HashRouter>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/" render={()=>
                localStorage.getItem("token")?
                    <GTASandBox></GTASandBox>:
                    <Redirect to="/login"/>
            }/>
        </Switch>
    </HashRouter>
  )
}