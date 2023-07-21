import React from "react";

const CarritoList = ({ carrito, eliminarDelCarrito }) => {
  const urlImages = "http://127.0.0.1:4000/images/";

  const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + producto.precio, 0);
  };

  if (!carrito || carrito.length === 0) {
    return <p>El carrito está vacío.</p>;
  }

  return (
    <div>
      <h2>Carrito de compras</h2>
      <div className="container py-5">
        <div className="row row-cols-1 row-cols-md-4 row-cols-g-4">
          {carrito.map((producto, index) => (
            <div className="col p-3" key={index}>
              <div className="card h-100">
                <img
                  src={urlImages + producto.image.filename}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text">{producto.descripcion}</p>
                </div>
                <div
                  className="card-footer bg-transparent border-success"
                  align="right"
                >
                  <label htmlFor="floatingPlaintextInput">
                    Costo: ${producto.precio}&nbsp;
                  </label>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => eliminarDelCarrito(index)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p>Total en carrito: ${calcularTotal()}</p>
      {/* Puedes agregar un botón aquí para finalizar la compra */}
    </div>
  );
};

export default CarritoList;

