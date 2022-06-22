import React from "react";
import {UserContext} from "./Context";


function toggleAdmin(id, isAdmin, wayToApi, _this){

    let url = wayToApi+"toggleAdmin/?id="+id+"&isAdmin="+isAdmin;
    fetch(url).then(()=>{
       _this.setState({isAdmin: !isAdmin})
    }, (reject)=>{
        console.log(reject)
    })
}
class User extends React.Component{
    constructor() {
        super();
        this.state = {
            isLoaded: false,

        }

    }
    style = {
        display: "inline-block",
        minWidth: "30%",
        maxWidth:"30%",
        height: "40%",
        padding: "1%",
        borderColor: "#cfc78c",
        borderStyle: "inset",
        borderWidth: "2px",
    }



    render() {

        return (
            <UserContext.Consumer>
                {
                    (context)=>{
                        {
                            let id = context.removeFromStack()
                            let wayToAPI =context.wayToApi+"user/&id="+id;
                            let newState = {};
                            if (!this.state.isLoaded)
                            {
                                fetch(wayToAPI).then(
                                    (response)=>{
                                        response.json().then(
                                            (json)=>{
                                                newState = json[0];
                                            

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
                                <div>Фамилия: {this.state.sName}</div>
                                {this.state.fName?<div>Имя: {this.state.fName}</div>:""}
                                {this.state.tName?<div>Отчество: {this.state.tName}</div>:""}
                                <div>Дата рождения: {this.state.wasBorn}</div>
                                <div>Номер телефона: {this.state.mobilePhone}</div>
                                <div>email: {this.state.email}</div>

                            </div>

                        )
                    }
                }
            </UserContext.Consumer>
        );
    }
}
export default User;

