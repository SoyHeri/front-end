import React, { useEffect, useState } from "react";
import Axios from "../../service/Axios";

function HomeNiño() {
  const [datos, setDatos] = useState([]);
  const urlImages = "http://127.0.0.1:4000/images/";

  const consultarDatos = async () => {
    const consultar = await Axios.get("/producto/consultarProducto");
    setDatos(consultar.data);
    console.log(consultar);
  };

  useEffect(() => {
    consultarDatos();
  }, []);

  // Filtrar los productos por la categoría
  const productosNiño = datos.filter(
    (producto) => producto.categoria === "Niño"
  );

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-5">
        <div className="row row-cols-1 row-cols-md-4 row-cols-g-4">
          {productosNiño.map((ropaNiño) => (
            <div className="col p-3" key={ropaNiño._id}>
              <div className="card h-100">
                <img
                  src={urlImages + ropaNiño.image.filename}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{ropaNiño.nombre}</h5>
                  <p className="card-text">{ropaNiño.descripcion}</p>
                </div>
                <div
                  className="card-footer bg-transparent border-success"
                  align="right"
                >
                  <label htmlFor="floatingPlaintextInput">
                    Costo: ${ropaNiño.precio}&nbsp;
                  </label>
                  <label htmlFor="floatingPlaintextInput">
                    Cantidad: {ropaNiño.cantidad}&nbsp;
                  </label>
                  <button type="button" className="btn btn-outline-success">
                    <i className="bi bi-cart4"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeNiño;