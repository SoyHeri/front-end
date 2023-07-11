import React, { useEffect, useState } from "react";
import Axios from "../service/Axios";
import { useNavigate, useParams } from "react-router-dom";

function Editar() {
  const variables = {
    id: "",
    nombre: "",
    categoria: "",
    talla: "",
    precio: "",
    cantidad: "",
    descripcion: "",
    image: "",
  };

  

  const [saveDatos, setSaveDatos] = useState(variables);
 

  const params = useParams();
  const navigate = useNavigate();

  const buscarOne = async () => {
    const editar = await Axios.get(`producto/oneProducto/${params.id}`);
    setSaveDatos(editar.data);
    console.log(editar.data);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setSaveDatos({ ...saveDatos, [name]: value });
    console.log(e.target)
  };

  const editarForm = async (e) => {
    e.preventDefault();
    
    try {
      await Axios.patch(`producto/updateProducto/${params.id}`, saveDatos);
      console.log("Datos actualizados correctamente");
      navigate(`/product`);
    } catch (error) {
      console.error("Error al editar el producto:", error);
    }
  };

  useEffect(() => {
    buscarOne(params.id);
  }, [params.id]);

  return (
    <div>
      <form
        className="row g-3"
        onSubmit={editarForm}
        id="formedit"
        encType="multipart/form-data"
      >
        <div className="col-md-12">
          <label htmlFor="validationDefault01" className="form-label">
            Nombre del producto
          </label>
          <input
            type="text"
            className="form-control"
            id="validationDefault01"
            placeholder="Nombre del producto"
            name="nombre"
            value={saveDatos.nombre}
            onChange={onChange}
            required
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="validationDefault02" className="form-label">
            Categoría
          </label>
          <input
            type="text"
            className="form-control"
            id="validationDefault02"
            placeholder="Categoría"
            name="categoria"
            value={saveDatos.categoria}
            onChange={onChange}
            required
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="validationDefault03" className="form-label">
            Talla
          </label>
          <input
            type="text"
            className="form-control"
            id="validationDefault03"
            placeholder="Introduzca la Talla"
            name="talla"
            value={saveDatos.talla}
            onChange={onChange}
            required
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="validationDefault04" className="form-label">
            Precio
          </label>
          <input
            type="text"
            className="form-control"
            id="validationDefault04"
            placeholder="Precio del producto"
            name="precio"
            value={saveDatos.precio}
            onChange={onChange}
            required
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="validationDefault05" className="form-label">
            Cantidad
          </label>
          <input
            type="text"
            className="form-control"
            id="validationDefault05"
            placeholder="Cantidad de productos"
            name="cantidad"
            value={saveDatos.cantidad}
            onChange={onChange}
            required
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="validationDefault06" className="form-label">
            Descripción
          </label>
          <textarea
            className="form-control"
            id="validationDefault06"
            placeholder="Redacta una descripción"
            name="descripcion"
            value={saveDatos.descripcion}
            onChange={onChange}
            required
          />
        </div>
        <div className="col-md-12">
          <input
            type="file"
            className="form-control"
            id="validationDefault07"
            placeholder="Ingresa la imagen"
            name="image"
            value={saveDatos.image}
            onChange={onChange}
            required
          />
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Editar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Editar;
