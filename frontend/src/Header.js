import React from 'react';
import {UserContext} from "./Context";



class Header extends React.Component{
    style = {
        width : "100%",
        height:"20%",
        display: "grid",
        gridTemplateColumns:"4fr 1fr",
        overflowX: "hidden",

    }
    imageStyle = {
        height: "100%",
        width: "25%",
        align: "center",
        marginLeft:"auto",
        marginRight:"15%",
        display: "inline-block",
    }
    registrStyle = {
        display: "inline-block",
        width: "10%",
        marginLeft:"auto",
        marginRight:"auto",
        marginTop:"15%",
    }
    button = {
        padding:"9px",
        paddingLeft:"22px",
        paddingRight:"22px",

    }
    constructor() {
        super();
        this.state = {
            isLoaded: false,
        }
    }

    render() {
        return (
            <UserContext.Consumer>
                {(context)=>{
                    if(!this.state.isLoaded){
                        fetch(context.wayToApi+"user/?id="+context.id).then(
                            (response)=>{
                                response.json().then(
                                    (json)=>{
                                        try {
                                            this.setState({isLoaded: true, login: json[0].login})
                                        }
                                        catch (e){

                                        }

                                    },
                                    reason => console.log(reason)
                                )
                            },
                            (reject)=>{
                                console.log(reject)
                            },
                        )
                    }
                    return (
                        <div id={"header"} style={this.style}>
                            <div style={this.imageStyle}>
                                <img style={this.imageStyle} src={"https://abali.ru/wp-content/uploads/2019/10/Sledstvenny_komtet_gerb-768x968.png"} />
                            </div>
                            <div style={this.registrStyle}>
                                {
                                    context.isAuth?<a href="/profile"><button style={this.button}>Профиль: {this.state.login}</button></a>
                                        :<a href="/login"><button style={this.button}>Войти</button></a>
                                }
                            </div>
                        </div>
                    )
                }}
            </UserContext.Consumer>
        );
    }
}



export  default Header;