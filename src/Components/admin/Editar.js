import React, { useEffect, useState } from "react";
import Axios from "../../service/Axios";
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
  const [previewImage, setPreviewImage] = useState(null); // Estado para la vista previa de la imagen

  const params = useParams();
  const navigate = useNavigate();

  const buscarOne = async () => {
    const editar = await Axios.get(`producto/oneProducto/${params.id}`);
    setSaveDatos(editar.data);
    console.log(editar.data);
  };

  useEffect(() => {
    buscarOne(params.id);
  }, [params.id]);

  const onChange = (e) => {
    const { name, value, type } = e.target;

    // Si el evento es causado por un cambio en el campo de imagen, actualizamos la vista previa.
    if (type === "file" && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }

    setSaveDatos({ ...saveDatos, [name]: value });
  };

  const editarForm = async (e) => {
    e.preventDefault();

    try {
      const form = document.getElementById("formedit");
      const formData = new FormData(form);

      await Axios.patch(`producto/updateProducto/${params.id}`, formData);
      console.log("Datos actualizados correctamente");
      navigate(`/product`);
    } catch (error) {
      console.error("Error al editar el producto:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Editar Producto</h2>
      <form
        className="row g-3"
        onSubmit={editarForm}
        id="formedit"
        encType="multipart/form-data"
      >
        <div className="col-md-6">
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
        <div className="col-md-6">
          <label htmlFor="validationDefault02" className="form-label">
            Categoría
          </label>
          <select
            className="form-select"
            aria-label="Seleccione una Categoría"
            name="categoria"
            value={saveDatos.categoria}
            onChange={onChange}
            required
          >
            <option value="" disabled>Seleccione una Categoría</option>
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
            <option value="Niño">Niño</option>
            <option value="Niña">Niña</option>
          </select>
        </div>
        <div className="col-md-6">
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
        <div className="col-md-6">
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
        <div className="col-md-6">
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
        <div className="col-md-6">
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
        <div className="col-md-6">
          <label className="form-label">Imagen Actual</label>
          <img
            src={
              previewImage || // Muestra la vista previa si está disponible
              "http://localhost:4000/images/" + saveDatos.image.filename
            }
            className="img-thumbnail"
            style={{ width: 100, height: 100 }}
            alt="..."
          />
        </div>
        
        <div className="col-md-6">
          <label htmlFor="image" className="form-label">
            Subir Nueva Imagen
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
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