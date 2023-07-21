import React, { useEffect, useState } from "react";
import Axios from "../../service/Axios";
import CarritoList from "./CarritoList"; 

const Card = () => {
  const [datos, setDatos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const urlImages = "http://127.0.0.1:4000/images/";

  const consultarDatos = async () => {
    const consultar = await Axios.get("/producto/consultarProducto");
    setDatos(consultar.data);
    console.log(consultar);
  };

  useEffect(() => {
    consultarDatos();
  }, []);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };

  return (
    <div>
      {/* Renderiza el componente CarritoList pasándole el carrito y la función eliminarDelCarrito */}
      <CarritoList carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} />
      {/* Renderiza el componente Card con la lista de productos */}
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row row-cols-1 row-cols-md-4 row-cols-g-4">
            {datos.map((ropa, index) => (
              <div className="col p-3" key={index}>
                <div className="card h-100">
                  <img
                    src={urlImages + ropa.image.filename}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{ropa.nombre}</h5>
                    <p className="card-text">{ropa.descripcion}</p>
                  </div>
                  <div
                    className="card-footer bg-transparent border-success"
                    align="right"
                  >
                    <label htmlFor="floatingPlaintextInput">
                      Costo: ${ropa.precio}&nbsp;
                    </label>
                    <label htmlFor="floatingPlaintextInput">
                      Cantidad: {ropa.cantidad}&nbsp;
                    </label>
                    <button
                      type="button"
                      className="btn btn-outline-success"
                      onClick={() => agregarAlCarrito(ropa)}
                    >
                      <i className="bi bi-cart4"></i> Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Card;
