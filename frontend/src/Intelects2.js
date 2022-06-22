import React from "react";
import {UserContext} from "./Context";
class Intelects2 extends React.Component{
    constructor(p) {
        super(p);
        this.state = {
            isLoaded: false,
            FCsfilter: null
        }
        this.p = p
    }


    butoonstyle = {
        width: "98%",
    }
    resultstyle = {
        textAlign:"center",
        fontSize:"120%",
        paddingTop:"15px",
        paddingBottom:"15px"
    }
    render() {
        return(<UserContext.Consumer>
                {(context)=>{
                    fetch(context.wayToApi+"prot/").then(
                        (response)=>{
                            response.json().then(
                                (json)=>{

                                    if(this.state.prots === undefined){
                                        this.setState({prots:json})
                                    }

                                },

                            )
                        },

                    )
                    fetch(context.wayToApi+"felon/").then(
                        (response)=>{
                            response.json().then(
                                (json)=>{
                                    if(this.state.felons === undefined){
                                        this.setState({felons:json})
                                    }

                                },

                            )
                        },

                    )


                    let id = context.id
                    let wayToAPI =context.wayToApi+"felon/&id="+id;
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
                    let id2 = context.id
                    let wayToAPI2 =context.wayToApi+"prot/&id="+id2;
                    if (!this.state.isLoaded)
                    {
                        fetch(wayToAPI2).then(
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

                    let myFelons = []
                    if (this?.state?.felons)
                        this.state.felons.forEach((value)=>{return myFelons.push(value)})

                    let victim = [
                        {victim: "--Выберите--"}
                    ]

                    if (this?.state?.prots)
                        this.state.prots.forEach((value)=>{return victim.push(value)})



                    function res1 (this_) {
                        let fellow = this_.state.felons
                        let vic = this_?.state.prots.filter((value)=>{return value.victim === this_?.state.FCsfilter})[0]

                        let filterd = fellow.filter((fel)=>{return vic.city == fel.city}).map(fel=>fel.FCs)

                        document.getElementById("result").innerHTML = JSON.stringify(filterd).replace(/\"|\[|\]/g, "").replace( /,/g, '<br/>')

                        }
                    function res2 (this_) {
                        let fellow = this_.state.felons
                        let vic = this_?.state.prots.filter((value)=>{return value.victim === this_?.state.FCsfilter})[0]
                        let filterd2 = fellow.filter((fel)=>{return vic.city == fel.city  && vic.age>=fel.minvage && vic.age <= fel.maxvage}).map(fel=>fel.FCs)
                        document.getElementById("result2").innerHTML = JSON.stringify(filterd2).replace(/\"|\[|\]/g, "").replace(/,/g, '<br/>')


                    }
                    function res3 (this_) {
                        let fellow = this_.state.felons
                        let vic = this_?.state.prots.filter((value)=>{return value.victim === this_?.state.FCsfilter})[0]
                        let filterd3 = fellow.filter((fel)=>{return vic.city == fel.city  && vic.age>=fel.minvage && vic.age <= fel.maxvage && vic.gender === fel.vgender}).map(fel=>fel.FCs)
                        document.getElementById("result3").innerHTML = JSON.stringify(filterd3).replace(/\"|\[|\]/g, "").replace(/,/g, '<br/>')

                    }
                    return(<div>
                        <div className="choise">
                            <div style={{marginBottom:"3%", fontSize:"105%"}}>Поиск подозреваемых</div>
                            <div>
                                <select style={{width:"100%"}} id={"FCs_filter_select_id"} onChange={(e)=>{this.setState({FCsfilter: e.target.value})}}>
                                    {victim.filter((value, index, array)=>{
                                        return  array.map(val => val.victim).indexOf(value.victim)===index
                                    }).map((value)=>{
                                        return <option>{value.victim}</option>})}
                                </select>  </div>

                            {this.state.FCsfilter && <button  style = {{marginTop:"15px", width: "98%",}} onClick={()=>{res1(this)}}>Поиск по городу</button>}<br/>
                            <div style={this.resultstyle} id={"result"}></div>
                            {this.state.FCsfilter && <button style={this.butoonstyle} onClick={()=>{res2(this)}}>Поиск по городу и возрасту</button>}<br/>
                            <div style={this.resultstyle} id={"result2"}></div>
                            {this.state.FCsfilter && <button style={this.butoonstyle} onClick={()=>{res3(this)}}>Поиск по городу, возрасту и полу</button>}<br/>
                            <div style={this.resultstyle} id={"result3"}></div>
                        </div>

                    </div>)
                }}
            </UserContext.Consumer>
        )
    }
}

export default Intelects2