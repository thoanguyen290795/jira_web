import { USER_LOGIN } from "../../util/constants/settingSystem";
import { USLOGIN } from "../constants/Cyberbugs/Cyberbugs";

let usLogin = {};

if(localStorage.getItem(USER_LOGIN)){
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN)); 
}

const stateDefault = {
    userLogin: usLogin,
    userSearch: []
}
 const UserLoginCyberBugsReducer = (state = stateDefault, action) =>{
    switch(action.type){
        case USLOGIN: 
        state.userLogin = action.userLogin;
        return {...state}
        case "GET_USER_SEARCH": 
        state.userSearch = action.listUserSearch; 
        return {...state}
        default: return {...state}
    }
}
export default UserLoginCyberBugsReducer