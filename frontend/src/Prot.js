import React from "react";
import {UserContext} from "./Context";


class Prot extends React.Component{

    constructor(p) {
        super(p);
        this.state = {
            isLoaded: false,
        }
        this.p = p
    }
    style = {
        display: "grid",
        gridTemplateColumns:"3% 12% 15% 10% 20% 20% 10% 10%",
        width: "80%",
        borderColor: "rgb(69 120 120)",
        borderStyle: "solid",
        borderWidth: "0.5px",
        borderCollapse: "collapse"
    
    
    }
    td = {
        padding: "5px",
        borderColor: "rgb(69 120 120)",
        borderStyle: "solid",
        borderWidth: "0.2px",
        borderCollapse: "collapse"
        
      }

    render() {
        let getFields = ()=>{
            let FCs = document.getElementById("FCs").value;
            let city = document.getElementById("city").value;
            let address = document.getElementById("address").value;
            let entity = document.getElementById("entity").value;
            let action = document.getElementById("action").value;
            let victim = document.getElementById("victim").value;
            return{
                FCs: FCs,
                city: city,
                address: address,
                entity: entity,
                action:action,
                victim:victim,
               
               
               
            }
        }
    
        if(this.props.value.city !== this.props.cityFilter && this.props.cityFilter && this.props.value.city !=="Город")
        return <div/> 
        if(this.props.value.FCs !== this.props.workerFilter && this.props.workerFilter && this.props.value.FCs !=="ФИО следователя")
        return <div/> 
        if(this.props.value.entity !== this.props.entityfilter && this.props.entityfilter && this.props.value.entity !=="Орган")
        return <div/> 
       
        return (
           <div>

            <UserContext.Consumer>
                            {(context)=>{
                            {
                            let id = context.removeFromStack()
                            let wayToAPI =context.wayToApi+"prot/&id="+id;
                            let newState  = {};
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
                                        })
                            }
                        }
                        let isLoaded = this.state.isLoaded;
                        return( <div>            

                            <div style={(!+this.p.value.id)?{backgroundColor: "rgb(121 188 188)", width: "80%", fontSize:"110%", color:"black" }:{}}>
                            <div style={(()=>{
                                let stle = JSON.parse(JSON.stringify(this.style))
                                if (isLoaded && this.p.value.id==="")
                                {
                                    stle.width = "100%"
                                }
                                return stle
                            })()} >
                                <div style={(()=>{
                                let stle = JSON.parse(JSON.stringify(this.style))

                                })()}>
                                    {isLoaded?this.p.value.id:""}
                                </div>
                                <div style={this.td}> 
                                    {isLoaded?this.p.value.FCs:""}
                                </div>
                                <div style={this.td}>
                                     {isLoaded?this.p.value.time:""}
                                </div>
                                <div style={this.td}>
                                    {isLoaded?this.p.value.city:""}
                                </div>
                                <div style={this.td}>
                                    {isLoaded?this.p.value.address:""}
                                </div>
                                <div style={this.td}>
                                    {isLoaded?this.p.value.victim:""}
                                </div>  
                                <div id={isLoaded?this.p.value.entity:""} style={this.td}>
                                     {isLoaded?this.p.value.entity:""}
                                </div> 
                                <div style={this.td}>
                                      {isLoaded?this.p.value.age:""}
                                            </div>  
                            </div>
                            
                            </div>
                           
                            </div> )
                    }
                    
                }
            </UserContext.Consumer>
            </div>);
    }
}
export default Prot;

