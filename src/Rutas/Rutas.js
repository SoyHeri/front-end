import {Routes,Route } from "react-router-dom";
import ClientLayout from "../Layout/ClientLayout/ClientLayout";

import InicioHome from "../Paginas/Client/InicioHome";
import Product from "../Components/admin/TableProductos";
import Edicion from "../Components/admin/Editar";
import HomeHombre from "../Paginas/Client/HomeHombre";
import HomeMujer from "../Paginas/Client/HomeMujer";
import HomeNiño from "../Paginas/Client/HomeNiño";
import HomeNiña from "../Paginas/Client/HomeNiña";
import Car from "../Paginas/Client/CarritoList";


//import Product from "../Components/Admin/Table";



function Rutas(){
    return(
               
        <ClientLayout>
            <Routes>
                
                <Route path="/home" element={<InicioHome/>}/>
                <Route path="/caballero" element={<HomeHombre/>}/>
                <Route path="/dama" element={<HomeMujer/>}/>
                <Route path="/niño" element={<HomeNiño/>}/>
                <Route path="/niña" element={<HomeNiña/>}/>
                <Route path="/product" element={<Product/>}/>
                <Route path="/carrito" element={<Car/>}/>
                <Route path="/product/editar/:id" element={<Edicion />} />
                
                
                

            </Routes>
        </ClientLayout>
        
)
}

export default Rutas;