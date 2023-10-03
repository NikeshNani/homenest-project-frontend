import React, { useContext }  from "react"
import PGList from "./PgList"
import { RoleContext } from "./NavBar"

const ResidentDashBoard = (props) => {
    const {role} = useContext(RoleContext)
    return(
        <div>
            {role === 'pg_resident' && 
                <div>
                    <PGList />
                </div>
            }
        </div>
    )
}

export default ResidentDashBoard