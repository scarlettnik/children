import React from "react";
import {UserContext} from "./Context";
class Victim extends React.Component{
    constructor() {
        super();
        this.state = {
            isLoaded: false,

        }

    }
    style = {
        fontSize:"120%",
        display: "inline-block",
        width: "35%",
        maxWidth:"30%",
        height: "40%",
        padding: "1%",
        borderColor: "rgb(69 120 120)",
        borderStyle: "solid",
        borderWidth: "2px",
    }



    render() {

        return (
            <UserContext.Consumer>
                {
                    (context)=>{
                        {
                            let id = context.removeFromStack()
                            let wayToAPI =context.wayToApi+"prot/&id="+id;
                            let newState = {};
                            if (!this.state.isLoaded)
                            {
                                fetch(wayToAPI).then(
                                    (response)=>{
                                        response.json().then(
                                            (json)=>{
                                                this.setState({isLoaded: true, data: json[0]});
                                            },
                                            (reject)=>{
                                                console.log(reject)
                                            }
                                        )
                                    },
                                    (reject)=>{
                                        console.log(reject)
                                    });
                            }


                        }

                        return(

                            <div style={this.style}>
                                <div>{this.state.data?this.state.data.victim:""}
 </div>
                                <div>
                                    <a href={"prots/?victim="+(this.state.data?this.state.data.victim:"")}>
                                        <button >
                                            Посмотреть протокол
                                        </button>
                                    </a>
                                </div>
                            </div>

                        )
                    }
                }
            </UserContext.Consumer>
        );
    }
}
export default Victim;