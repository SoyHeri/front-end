import React from "react";
import MenuClient from "../../Components/admin/MenuClient"


function ClientLayout({children}) {
    return(
        <div>
            <MenuClient/>
            {children}
        </div>
    )
}

export default ClientLayout;