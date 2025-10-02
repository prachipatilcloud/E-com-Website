import { createContext, useContext, useReducer } from "react";
import { loginReducer } from "../reducers/loginReducer";

const LoginContext = createContext();

const LoginProvider = ({children}) => {

    const initialState = {
        email: "",
        password: "",
        token: ""

    }

    const [{email, password, token}, loginDispatch] = useReducer(loginReducer, initialState);

    return (
        <LoginContext.Provider value={{email, password, token, loginDispatch}}>
            {children}
        </LoginContext.Provider>
    )
}

const uselogin = () => useContext(LoginContext);
export {LoginProvider, uselogin};