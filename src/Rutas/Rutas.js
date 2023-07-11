import {Routes,Route } from "react-router-dom";
import ClientLayout from "../Layout/ClientLayout/ClientLayout";
import HomeClient from "../Paginas/Client/HomeMujer";
import HomeHombre from "../Paginas/Client/HomeHombre";
import HomeNiña from "../Paginas/Client/HomeNiña";
import HomeNiño from "../Paginas/Client/HomeNiño";
import InicioHome from "../Paginas/Client/InicioHome";
import Product from "../Components/TableProductos";
import Edicion from "../Components/Editar"

//import Product from "../Components/Admin/Table";



function Rutas(){
    return(
               
        <ClientLayout>
            <Routes>
                <Route path="/dama" element={<HomeClient/>}/>
                <Route path="/caballero" element={<HomeHombre/>}/>
                <Route path="/niña" element={<HomeNiña/>}/>
                <Route path="/niño" element={<HomeNiño/>}/>
                <Route path="/Home" element={<InicioHome/>}/>
                <Route path="/product" element={<Product/>}/>
                <Route path="/product/editar/:id" element={<Edicion />} />
                

            </Routes>
        </ClientLayout>
        
)
}

export default Rutas;