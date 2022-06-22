import React from "react";
import {UserContext} from "./Context";
import Prot from "./Prot";
class Prots extends React.Component{
  constructor(p) {
            super(p);
            this.state = {
                isLoaded: false,
                cityfilter: null,
                workerfilter: null,
                entityfilter: null
            }
            this.p = p
        }
    style = {
        position:"relative",
        display:"inline-block",
        align: "center",
        width: "100%"
    }
    filterstyle = {
        float:"right",
        marginTop:"6%",
        marginRight:"3%",
        border:"1px solid rgb(121, 188, 188)",
        padding:"1%"
    }
    
    render() {
        return(<UserContext.Consumer>
                {(context)=>{

                    fetch(context.wayToApi+"prot/"+window.location.search).then(
                        (response)=>{
                            response.json().then(
                                (json)=>{
                                    if(this.state.prots === undefined){
                                        this.setState({prots:json})

                                    }
                                },
                               
                            )
                            
                            let id = context.id
                            let wayToAPI =context.wayToApi+"prot/&id="+id;
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
                                   
                        },   
                    )


                    let myProts = [
                    { id: "",
                    FCs: "ФИО следователя",
                    time: "Дата и время",
                    city: "Город",
                    address: "Адрес",
                    victim: "Пострадавший",
                    entity: "Орган",
                    age: "Возраст",
                    }]

                    if (this?.state?.prots)
                        this.state.prots.forEach((value)=>{return myProts.push(value)})
                    console.log(myProts)

                   
                    return(<div style={this.style}>
                        <div style={this.filterstyle}>

                        
                     <div style={{marginBottom:"3%", fontSize:"105%"}}>Инструменты поиска</div>
                     
                     
                    <div>

                        
                   
                   
                    <select style={{width:"100%"}} id={"FCs_select_id"} onChange={(e)=>{this.setState({workerfilter: e.target.value})}}>
                    {myProts.filter((value, index, array)=>{
                     return  array.map(val => val.FCs).indexOf(value.FCs)===index
                    }).map((value)=>{
                    return <option>{value.FCs}</option>})}
                    </select>  <div><button style={{padding:"1px", marginTop:"5px", marginBottom:"12px"}} onClick={() => {
                    this.setState({workerfilter: null})
                     document.getElementById("FCs_select_id").value = "ФИО следователя"
                     } }>Сбросить</button></div>  
  
                   
                   
                   



                    <select style={{width:"100%"}} id={"city_select_id"} onChange={(e)=>{this.setState({cityfilter: e.target.value})}}>
                    {myProts.filter((value, index, array)=>{
                     return  array.map(val => val.city).indexOf(value.city)===index
                    }).map((value)=>{
                    return <option>{value.city}</option>})}
                    </select>  <div><button style={{padding:"1px", marginTop:"5px", marginBottom:"12px"}} onClick={() => {
                    this.setState({cityfilter: null})
                     document.getElementById("city_select_id").value = "Город"
                     } }>Сбросить</button></div>  
                   
                   
                                                    

                    <select style={{width:"100%"}} id={"entity_filter_select_id"} onChange={(e)=>{this.setState({entityfilter: e.target.value})}}>
                    {myProts.filter((value, index, array)=>{
                        return  array.map(val => val.entity).indexOf(value.entity)===index
                    }).map((value)=>{
                    return <option>{value.entity}</option>})}
                    </select>  <div><button style={{padding:"1px", marginTop:"5px", marginBottom:"12px"}} onClick={() => {
                        this.setState({entityfilter: null})
                        document.getElementById("entity_filter_select_id").value = "Орган"
                    } }>Сбросить</button></div>  </div>
                     </div>

                        {
                            
                            myProts && myProts.length && myProts.map((value)=>{ 
                                context.addToStack(value.id);
                                return (
                                <div><Prot value={value} cityFilter={this.state.cityfilter} workerFilter={this.state.workerfilter} entityfilter={this.state.entityfilter}/>

                                <div></div>
                                </div>)
                            })
                            
                            
                        }
                    </div>)
                }}
            </UserContext.Consumer>
        )
    }
}

export default Prots