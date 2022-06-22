const http = require("http");
const nodemailer = require('nodemailer');
class Prot{
    constructor(){
        this.id = undefined;
        this.victim = undefined;
        this.FCs = undefined;
        this.city = undefined;
        this.entity = undefined;
        this.time = undefined;
        this.address = undefined;
        this.age = undefined;
        this.gender = undefined

    }
}
class User{
    constructor(){
        this.id = undefined;
        this.login = undefined;
        this.password = undefined;
        this.isAdmin = undefined;
        this.fName = undefined;
        this.sName = undefined;
        this.tName = undefined;
        this.email = undefined;
        this.mobilePhone = undefined;
        this.wasBorn = undefined;

    }
}
class Protocol{
    constructor(){
        this.id = undefined;
        this.fName = undefined;
        this.sName = undefined;
        this.tName = undefined;
    }
}


class Intelect{
    constructor(){
        this.id = undefined;
        this.FCs = undefined;
        this.city = undefined;
        this.maxvage = undefined;
        this.vgender = undefined;
        this.phonenumber = undefined;
    }
}
class Felon{
    constructor(){
        this.id = undefined;
        this.FCs = undefined;
        this.city = undefined;
        this.ncases = undefined;
        this.gender = undefined;
        this.age = undefined;
        this.minvage = undefined;
        this.maxvage = undefined;
        this.vgender = undefined;
        this.phonenumber = undefined;
    }
}

let tables = new Map();
function initializeMap() {
    tables.set("user", new User());
    tables.set("protocol", new Protocol());
    tables.set("prot", new Prot());
    tables.set("felon", new Felon());
    tables.set("intelect", new Intelect());
   
   
}
function sendEmail(email, message){
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            type: "login",
            user: "creencrocodileogr@gmail.com",
            pass: "mqzpdnyeiyqtwins"
        }
    });

    transporter.sendMail({
        from: "creencrocodileogr@gmail.com",
        to: email,
        subject: "Код авторизации",
        html: message
    }).then((resolve)=>{
            console.log(resolve)
        },
        (reject)=>{
            console.log(reject)
        });
}
function log(loggingSQL){
        getDataFromSQLite(loggingSQL).then((resolve, reject)=>{console.log(reject)});
}
function  getDataFromSQLite(request){

    console.log(request)
    let sqlite3 = require('sqlite3').verbose();
    let db = new sqlite3.Database('../database/database.db');
    return new Promise((resolve, reject)=>{
        db.serialize(()=>{
            db.all(request, (err, rows)=>{
                if (!err)
                {
                   resolve(rows)
                }
                else {
                    reject(err);
                }
            })
        })
        db.close();
    });
}

function sendDataToClient(request, responseTarget){
      getDataFromSQLite(request).then(
        (result)=> {
        responseTarget.write(JSON.stringify(result));
        responseTarget.end();
    },
        (error)=>console.log(error)
    );
}
function parser(tableName, args, responseTarget){

    let fields = Object.assign({}, tables.get(tableName));
    convertObjectToArgType(requestParamsToObjest(args), fields)
    let requestSQL = convertToSQLRequest(fields, tableName);
    if (!args)
        requestSQL = "SELECT * from " + tableName + ";";
    sendDataToClient(requestSQL, responseTarget);

};
function requestParamsToObjest  (request){
    let obj = {};
    try {
        let params = request.substr(request.indexOf("?") + 1).split("&");
        if (params.indexOf("favicon") < 0) {
            for (let i of params) {
                let name = i.split("=")[0];
                let val = i.split("=")[1];
                obj[name] = val;
            }
        }
    }
    catch (e){
        console.log(e);
    }
    return obj;
};
function parceRequest  (requestStr, responseTarget){
    let parts = requestStr.split("/");
    if (parts[1]!=="api")
        return null;
    else
        parser(parts[2], parts[3], responseTarget);
}
function convertObjectToArgType  (untypedObject, typedObject){
    for (let i of Object.keys(typedObject))
        typedObject[i] = untypedObject[i];
    return typedObject;
}
function convertToSQLRequest  (object, tableName){
let request = "SELECT * FROM "+tableName+" WHERE ";
    if (!Object.keys(object).length)
        return  request.replace("where", ";");
    for (let i of Object.keys(object))
    {
        if (object[i]!==undefined)
            request+=i.valueOf()+" = \'"+object[i]+"\' AND ";
    }
    request = request.substr(0, request.lastIndexOf("AND"));
    request+=";"
    return request;
}


function writeNewUserToDatabase(user){
    let request = `INSERT INTO user (fName, sName, tName, login, password, email, mobilePhone, wasBorn) 
    VALUEs(\'${user.fName}\', \'${user.sName}\', \'${user.tName}\', \'${user.login}\',
         \'${user.password}\', \'${user.email}\', \'${user.mobilePhone}\', \'${user.wasBorn}\')`;
    console.log(request);
    getDataFromSQLite(request).then(
        (response)=>{console.log(response)},
        (reject)=>{console.log(reject)});
   
    log(loggingSQL);
}
function writeNewProtocolToDatabase(prot){
    let request = `INSERT INTO prot (FCs, city, address, entity, age, victim, gender) 
    VALUEs(\'${prot.FCs}\', \'${prot.city}\', \'${prot.address}\',
         \'${prot.entity}\', \'${prot.age}\', \'${prot.victim}\', \'${prot.gender}\')`;
    console.log(request);
    getDataFromSQLite(request).then(
        (response)=>{console.log(response)},
        (reject)=>{console.log(reject)});
}
function registrate(url, response){
    let user = requestParamsToObjest(url);
    let keys = ["login", "mobliePhone", "email"];
    getDataFromSQLite("SELECT * FROM USER WHERE LOGIN= \'"+user.login+"\'").then(
        (responseLogin)=>{
            if (responseLogin.length===0){
                getDataFromSQLite("SELECT * FROM USER WHERE mobilePhone= \'"+user.mobilePhone+"\'").then(
                    (responseMobile)=>{
                        if (responseMobile.length===0){
                            getDataFromSQLite("SELECT * FROM USER WHERE email= \'"+user.email+"\'").then(
                                (responseEmail)=>{
                                    if (responseEmail.length===0){
                                        response.write(JSON.stringify({success:true}));
                                        writeNewUserToDatabase(user);
                                        response.end();
                                    }
                                    else {
                                        response.write(JSON.stringify({success:false, reason:"Email"}))
                                        response.end();
                                    }
                                },
                                (reject)=>{
                                    console.log(reject)
                                }
                            )
                        }
                        else {
                            response.write(JSON.stringify({success:false, reason:"Номер телефона "}))
                            response.end();
                        }
                    },
                    (reject)=>{
                        console.log(reject)
                    }
                )
            }
            else {
                response.write(JSON.stringify({success:false, reason:"Логин"}))
                response.end();
            }

        },
        (reject)=>{
            console.log(reject)
        }
    )
    }


    function addProtocol(url, response){
        let prot = requestParamsToObjest(url);
        writeNewProtocolToDatabase(prot);
        response.end();
    }
function manageMail (url, response){
    let objParams = requestParamsToObjest(url);
    console.log(objParams
    )
    sendEmail(objParams.email, objParams.message)
    response.end();

}
http.createServer(function(request, response){


    request.url = decodeURI(request.url);
    initializeMap();
    response.setHeader("Content-Type", "application/json; charset=UTF-8");
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin, Cache-Control");
    response.statusCode = 200;
    if (request.url.indexOf("favicon")>-1)
        response.end();
    else {
        if (request.url.indexOf("api")<0)
            response.end()
        else {
            if (request.url.split("/")[2]==="registration")
                registrate(request.url, response);
                else {
                    if (request.url.split("/")[2]==="prots")
                        addProtocol(request.url, response);
                else
                    if(request.url.split("/")[2]==="toggleAdmin"){
                        toggleAdmin(request.url, response);
                    }
                    else
                    if(request.url.split("/")[2]==="sendMail"){
                        manageMail(request.url, response);
                    }
                            else
                                parceRequest(request.url, response);
                }
        }

    }


}).listen(3001);

