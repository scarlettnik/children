import React from "react";
import {UserContext} from "./Context";
import Victim from "./Victim";

class Victims extends React.Component{
    constructor() {
        super();
        this.state = {

        }
    }
    style = {
        display:"inline-block",
        align: "right",
        widths: "70%"
    }
    render() {
        return(<UserContext.Consumer>
                {(context)=>{
                    fetch(context.wayToApi+"prot").then(
                        (response)=>{
                            response.json().then(
                                (json)=>{
                                    if(this.state.prots === undefined){
                                        this.setState({prots:json})
                                    }
                                },
                                reason =>console.log(reason)
                            )
                        },
                        (reject)=>{
                            console.log(reject)
                        }
                    )
                    return(<div style={this.style}>
                        {
                            this.state.prots!==undefined?this.state.prots.map((value)=>{
                               
                                context.addToStack(value.id);
                                return <Victim/>
                            }):""
                        }
                    </div>)
                }}
            </UserContext.Consumer>
        )
    }
}

export default Victims