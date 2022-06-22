import React from "react";
import {UserContext} from "./Context";


class Protocol extends React.Component{
    constructor() {
        super();
        this.state = {
        }
    }
    render() {
        let style = {
         
            align:"center",
     marginLeft:"37%",
            padding:"3%",
            display: "inline-block",
        }
        let validate = ( FCs, city, address, entity, action, context)=>{
            if (FCs == "") {
                alert("Введите ФИО следователя")
                return false;
            }
            if(city== ""){
                alert("Введите город")
                return false;
            }
            if(address=="") {
                alert("Введите адрес")
                return false;
            }
            if (entity == ""){
                alert("Введите орган")
                return false;
            }
            if (action == ""){
                alert("Введите действие ")
                return false;
            }
            return true;
        }
        let getFields = ()=>{
            let FCs = document.getElementById("FCs").value;
            let city = document.getElementById("city").value;
            let address = document.getElementById("address").value;
            let entity = document.getElementById("entity").value;
            let age = document.getElementById("age").value;
            let victim = document.getElementById("victim").value;
            let gender = document.getElementById("gender").value;
            return{
                FCs: FCs,
                city: city,
                address: address,
                entity: entity,
                age:age,
                victim:victim,
                gender:gender
            }
        }
        let addProtocol = (context)=>{
            if (!validate(getFields().FCs, getFields().city, getFields().address,
            getFields().entity, getFields().action, context))
            return null;
                    fetch(context.wayToApi+"prots/?FCs="+getFields().FCs+"&"
                        +"city="+getFields().city+"&"+"address="+getFields().address+"&"+
                        "entity="+getFields().entity+"&"+"age="+getFields().age+"&"+"victim="+getFields().victim
                        +"&"+"gender="+getFields().gender
                       ).then(


                        (reject)=>{
                            console.log(reject)
                        }
                    )
                
            
        }

 
        return (
            <UserContext.Consumer>
                {
                    (context)=>{
                        return (<div style={style} className="login form">
                                <div >
                                        <div style={{fontSize:"105%"}}>Введите данные для создания протокола</div>
                                        <input  type={"text"} id={"FCs"} placeholder={"ФИО следователя"}/>
                                        <input  type={"text"} id={"city"} placeholder={"Город"}/>
                                        <input  type={"text"} id={"address"} placeholder={"Адрес"}/>
                                        <input  type={"text"} id={"entity"} placeholder={"Орган"}/>
                                        <input  style={{width:"91%", marginLeft: "5px"}} type={"number"} id={"age"} placeholder={"Возраст жертвы"}/>
                                        <input  type={"text"} id={"gender"} placeholder={"Пол жертвы"}/>
                                        <input  type={"text"} id={"victim"} placeholder={"Пострадавший"}/>
                                        <button style={{width:"300px"}} onClick={()=>{addProtocol(context)}}>Добавить</button>
                                </div>
                                </div>                   

                            )
                        }
                    }
            </UserContext.Consumer>
        );
    }
}

export default Protocol ;
