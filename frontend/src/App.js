import React from 'react';
import Header from "./Header";
import Sidemenu from "./Sidemenu";
import Content from "./Content";
import {UserContext} from "./Context";



class App extends React.Component{
    constructor(props) {
        super(props);

    }
    style = {
        
        backgroundColor:"#2F4F4F",
        fontFamily: "Courier monospace",
        minHeight: window.innerHeight,
    }
    exit = ()=>{};
    render(){
        return(
            <div style={this.style}>
                <Header/>
                <Sidemenu/>
                <Content/>
            </div>
        )
    }
}
export default App;
