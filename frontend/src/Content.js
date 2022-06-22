import React from "react";
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Victims from "./Victims";
import Home from "./Home";
import Registration from "./Registration";
import Prots from "./Prots";
import Login from "./Login";
import {UserContext} from "./Context";
import Profile from "./Profile";
import Users from "./Users";
import Error404 from "./Error404";
import Protocol from "./Protocol";
import Felons from "./Felons";
import Intelects from "./Intelects";
import Intelects2 from "./Intelects2";

class Content extends React.Component{

    render() {
        let style = {
            display: "inline-block",
            marginLeft:"3%",        
            padding: "1%",
            width: "90%"

        }
        return (
           <UserContext.Consumer>
               {()=>{
                   return(
                       <div style={style}>
                           <BrowserRouter>
                               <Switch>
                                   <Route exact path="/" component={Login} />
                                   <Route exact path="/home" component={Home} />
                                   <Route exact path="/prots" component={Prots} />
                                   <Route exact path="/registration" component={Registration} />
                                   <Route exact path="/victims" component={Victims} /> 
                                   <Route exact path="/protocol" component={Protocol} />
                                   <Route exact path="/profile" component={Profile} />
                                   <Route exact path="/users" component={Users}/>
                                   <Route exact path="/felons" component={Felons}/>
                                   <Route exact path="/intelects" component={Intelects}/>
                                   <Route exact path="/intelects2" component={Intelects2}/>
                                   <Route exact path="/login" component={Login}/>
                                   <Route path="/" component={Error404}/>
                               </Switch>
                           </BrowserRouter>
                       </div>
                   )
               }}
           </UserContext.Consumer>
        );
    }
}
export default Content;