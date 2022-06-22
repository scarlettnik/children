import React from "react";
import {UserContext} from "./Context";
import Felon from "./Felon";

class Felons extends React.Component{
    constructor() {
        super();
        this.state = {

        }
    }
    style = {
        display:"inline-block",
        align: "right",
        width: "100%"
    }
    headerstyle = {
            color:"black",
            display: "grid",
            gridTemplateColumns:"25% 15% 10% 10% 15% 10% 15%",
            width: "90%",
            borderColor: "black",
            borderStyle: "solid",
            borderWidth: "0.5px",
            margin:"auto",
            backgroundColor: "rgb(121, 188, 188)",

    }
    innerstyle = {
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: "1.5px",
        paddingBottom:"15px",
        textAlign:"center"
    }
    render() {
        return(<UserContext.Consumer>
                {(context)=>{
                    fetch(context.wayToApi+"felon").then(
                        (response)=>{
                            response.json().then(
                                (json)=>{
                                    if(this.state.felons === undefined){
                                        this.setState({felons:json})
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
                       <div style={this.headerstyle}>
                           <div style={this.innerstyle}>ФИО преступника</div>
                           <div style={this.innerstyle}>Город проживания</div>
                           <div style={this.innerstyle}>Пол преступника</div>
                           <div style={this.innerstyle}>Возраст престпника</div>
                           <div style={this.innerstyle}>Номер телефона преступника</div>
                           <div style={this.innerstyle}>Возраст жертв</div>
                           <div style={this.innerstyle}>Пол жертв</div>

                       </div>
                        {
                            this.state.felons!==undefined?this.state.felons.map((value)=>{
                                context.addToStack(value.id);
                                return <Felon/>
                            }):""
                        }
                    </div>)
                }}
            </UserContext.Consumer>
        )
    }
}

export default Felons