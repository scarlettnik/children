import React from "react";
import {UserContext} from "./Context";

class Profile extends React.Component{
    constructor() {
        super();
        this.state = {
            isLoaded: false,

        }

    }
    render() {
        return (
            <UserContext.Consumer>
                {
                    (context)=>{
                        {
                            let wayToAPI = context.wayToApi+"user/?id="+context.id;
                            let newState = {};
                            console.log(wayToAPI)
                            if (!this.state.isLoaded)
                            {
                                fetch(wayToAPI).then(
                                    (response)=>{
                                        response.json().then(
                                            (json)=>{
                                                newState = json[0];
                                                fetch(wayToAPI).then(
                                                    (response)=>{
                                                        response.json().then(
                                                            (json)=>{
                                                               
                                                                newState = Object.assign(newState);
                                                                this.setState( newState);
                                                            },
                                                            (reject)=>{
                                                                console.log(reject)
                                                            }
                                                        )
                                                    },
                                                    (reject)=>{
                                                        console.log(reject)
                                                    });
                                                this.setState({isLoaded: true});

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

                            <div>
                                <div>??????????????: {this.state.sName}</div>
                                {this.state.fName?<div>??????: {this.state.fName}</div>:""}
                                {this.state.tName?<div>????????????????: {this.state.tName}</div>:""}
                                <div>???????? ????????????????: {this.state.wasBorn}</div>
                                <div>?????????? ????????????????: {this.state.mobilePhone}</div>
                                <div>email: {this.state.email}</div>
                              
                                <a href="/login"><button onClick={context.exit}>??????????</button></a>
                            </div>
                        )
                    }
                }
            </UserContext.Consumer>
        );
    }
}
export default Profile;

