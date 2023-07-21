import {Link} from "react-router-dom";
import '../admin/MenuClient.css';


function MenuClient2() {
  return (
    <div>
        <nav>
            <Link to="/home">Home</Link>
            <Link to="/dama">DAMA</Link>
            <Link to="/caballero">CABALLERO</Link>
            <Link to="/niña">NIÑA</Link>
            <Link to="/niño">NIÑO</Link>
            <Link to="/product">Producto</Link>
            <Link to="/carrito">Carrito</Link>
            <div class="animation start-home"></div>
        </nav>
    </div>
  )
}

export default MenuClient2;