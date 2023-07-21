import React from "react";
import MenuClient from "../../Components/admin/MenuClient2"


function ClientLayout({children}) {
    return(
        <div>
            <MenuClient/>
            {children}
        </div>
    )
}

export default ClientLayout;