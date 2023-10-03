import React from "react";
import { Route } from "react-router-dom"
import { Redirect } from "react-router-dom";
const PrivateRoute = ({component : Component , ...rest}) => {
    return(
        <Route
            {...rest}
            render = {(props)=>{
                return localStorage.getItem('token') ? (
                    <Component
                        {...props}
                    /> 
                    ) : (
                        <Redirect 
                            to = {{pathname : "/login"}}
                        />
                    )
            }}
        />
    )

}
export default PrivateRoute
