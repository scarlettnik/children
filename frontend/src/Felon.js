import React from "react";
import {UserContext} from "./Context";
class Felon extends React.Component{
    constructor() {
        super();
        this.state = {
            isLoaded: false,

        }

    }
    style = {
        display: "grid",
        gridTemplateColumns:"25% 15% 10% 10% 15% 10% 15%",
        width: "90%",
        borderColor: "rgb(69 120 120)",
        borderStyle: "solid",
        borderWidth: "0.5px",
        borderCollapse: "collapse",
        margin:"auto"
    }

    innerstyle = {
        borderColor: "rgb(69 120 120)",
        borderStyle: "solid",
        borderWidth: "1.5px",

        padding:"5px 0 5px 0",
        textAlign:"center"
    }

    render() {

        return (
            <UserContext.Consumer>
                {
                    (context)=>{
                        {
                            let id = context.removeFromStack()
                            let wayToAPI =context.wayToApi+"felon/&id="+id;
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
                                <div style={this.innerstyle}>{this.state.data?this.state.data.FCs:""}</div>
                                <div style={this.innerstyle}>{this.state.data?this.state.data.city:""}</div>
                                <div style={this.innerstyle}>{this.state.data?this.state.data.gender:""}</div>
                                <div style={this.innerstyle}>{this.state.data?this.state.data.age:""}</div>
                                <div style={this.innerstyle}>{this.state.data?this.state.data.phonenumber:""}</div>
                                <div style={this.innerstyle}>{this.state.data?this.state.data.minvage+"-"+this.state.data.maxvage:""}</div>
                                <div style={this.innerstyle}>{this.state.data?this.state.data.vgender:""}</div>




                            </div>

                        )
                    }
                }
            </UserContext.Consumer>
        );
    }
}
export default Felon;