import React from 'react';
import {UserContext} from "./Context";

class Sidemenu extends React.Component{
    style= {
      
        padding:"1%",
        minHeight:"50%",
        verticalAlign:"top",
        textDecoration:"none",
        
    }
    render(props) {
        return (
            <UserContext.Consumer>
                {(context)=>{
                    let isAuth = context.id;
                    return (
                        <div style={this.style}>
                            <ul style={{width:"98%",
                            textAlign:"right",
                            display:"grid",
                            gridTemplateColumns:"4.5fr 1.7fr 1.5fr 1fr 2fr 2fr 2fr 2fr 2fr",
                            listStyleType: "none",
                              backgroundColor:"#d3d3d3",
                                 padding: "1%",
                                 color: "#000",
                                 textDecoration: "none",
                                 borderRadius: "10px"  }}>
                                     {context.isAdmin?<li><a href={"/registration"}>Регистрация следователя</a></li>:""}
                                {isAuth? <li><a href={"/victims"}>Пострадавшие</a></li>:""}
                               {isAuth?"":<li>Для получения доступа авторизируйтесь</li>}
                                {isAuth? <li><a href={"/prots"}>Протоколы</a></li>:""}
                                {isAuth?<li><a href={"/intelects2"}>Поиск</a></li>:""}
                                {isAuth?<li><a href={"/protocol"}>Создать протокол</a></li>:""}
                                {isAuth?<li><a href={"/felons"}>Преступники</a></li>:""}
                                {isAuth? <li><a href={"/intelects"}>Рассчитать</a></li>:""}
                                {isAuth?<li><a href={"/profile"}>Мой профиль</a></li>:""}
                                {isAuth?<li><a onClick={context.exit} href="/">Выход</a></li>:""}
                            </ul>
                        </div>
                    )
                   /**  {isAuth? <li><a href={"/starts"}>Статистика</a></li>:""}*/
                }}
            </UserContext.Consumer>
        );
    }
}
export default Sidemenu;