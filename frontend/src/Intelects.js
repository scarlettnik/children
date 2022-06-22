import React from "react";
import {UserContext} from "./Context";
class Intelects extends React.Component{
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
        paddingTop:"15px"
    }
    render() {
        return(<UserContext.Consumer>
                {(context)=>{
                    fetch(context.wayToApi+"felon/"+window.location.search).then(
                        (response)=>{
                            response.json().then(
                                (json)=>{
                                    if(this.state.felons === undefined){
                                        this.setState({felons:json})

                                    }
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

                        },
                    )
                    let myFelons = [
                        {FCs: "--Выберите--"}
                    ]

                    if (this?.state?.felons)
                        this.state.felons.forEach((value)=>{return myFelons.push(value)})



                    function res (this_) {
                        let fellow = this_?.state.felons.filter((value)=>{return value.FCs === this_?.state.FCsfilter})[0]

                        let city = (document.getElementById("city").value == fellow.city ) ? 1 : 0
                        let vAge = (document.getElementById("vage").value >= fellow.minvage &&
                            document.getElementById("vage").value <= fellow.maxvage ) ? 1 : 0
                        let vGender = (document.getElementById("vgender").value == fellow.vgender) ? 1 : 0
                        let call = (document.getElementById("call").value == fellow.phonenumber) ? 1 : 0
                        let ncasesmin = (fellow.ncases < 3) ? 1 : 0
                        let ncasesmed = (fellow.ncases >= 3 && fellow.ncases < 7) ? 1 : 0
                        let ncasesmax = (fellow.ncases >= 7) ? 1 : 0
                        let fage = (fellow.age<= 40) ? 1 : 0
                        let fagemax = (fellow.age>40) ? 1 : 0
                        let vagedop = (document.getElementById("vage").value > fellow.minvage-3 &&
                            document.getElementById("vage").value < fellow.minvage ||
                            document.getElementById("vage").value < fellow.maxvage+3 &&
                            document.getElementById("vage").value > fellow.maxvage)? 1 : 0


                        let scity = (city >= 1) ? 1:0
                        let svAge = (vAge >= 1) ? 1:0
                        let svGender = (vGender >= 1) ? 1:0
                        let scall = (call >= 1) ? 1:0
                        let sncasesmin = (ncasesmin >= 1) ? 1:0
                        let sncasesmed = (ncasesmed >= 1) ? 1:0
                        let sncasesmax = (ncasesmax >= 1) ? 1:0
                        let sfage = (fage >= 1) ? 1:0
                        let sfagemax = (fagemax >= 1)?1:0
                        let svagedop = (vagedop >= 1)?1:0

                        const inputs = [svAge, scity, svGender, scall, sncasesmin, sncasesmed, sncasesmax, sfage, sfagemax, svagedop];
                        const weights = [15, 18, 14, 21, 15, 17.5, 20, 15, 10, 10];

                        let sum = 0;
                        for (let i = 0; i < inputs.length; i++) {
                            sum += inputs[i] * weights[i];
                        };
                        if (sum<50){
                            document.getElementById("result1").innerHTML = "Низкая вероятноcть того, что "+ fellow.FCs + " является преступником"
                        }
                        else if (sum>=50 && sum<= 80) {
                            document.getElementById("result1").innerHTML = "Средняя вероятноcть того, что "+ fellow.FCs + " является преступником"
                        }
                        else {
                            document.getElementById("result1").innerHTML = "Высокая вероятноcть того, что "+ fellow.FCs + " является преступником"
                        }

                        document.getElementById("result").innerHTML = "Вероятноcть того, что "+ fellow.FCs + " является преступником составляет " +sum +"%"}

                    return(<div>
                        <div className="choise">
                            <div style={{marginBottom:"3%", fontSize:"105%"}}>Вероятность совершения преступления</div>
                            <div>
                                <select style={{width:"100%"}} id={"FCs_filter_select_id"} onChange={(e)=>{this.setState({FCsfilter: e.target.value})}}>
                                    {myFelons.filter((value, index, array)=>{
                                        return  array.map(val => val.FCs).indexOf(value.FCs)===index
                                    }).map((value)=>{
                                        return <option>{value.FCs}</option>})}
                                </select>  </div>


                        <input style={{width:"97%", margin:"5px 0 5px 0"}} type={"integer"} id={"city"} placeholder="Город совершения преступления"/>
                        <input style={{width:"97%", margin:"5px 0 5px 0"}} type={"number"} id={"vage"} placeholder="Возраст жертвы"/>
                        <input style={{width:"97%", margin:"5px 0 5px 0"}} type={"integer"} id={"vgender"} placeholder="Пол жертвы"/>
                        <input style={{width:"97%", margin:"5px 0 5px 0"}} type={"tel"} id={"call"} placeholder="Последний звонок"/><br/>



                            {this.state.FCsfilter && <button style={this.butoonstyle} onClick={()=>{res(this)}}>Рассчитать вероятность</button>}<br/>
                            <div style={this.resultstyle} id={"result1"}></div>
                            <div style={this.resultstyle} id={"result"}></div>
                        </div>

                    </div>)
                }}
            </UserContext.Consumer>
        )
    }
}

export default Intelects