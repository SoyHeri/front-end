import React, { useState, useEffect } from "react";

import Axios from "../service/Axios";
import { useNavigate } from "react-router-dom";



function TableProductos() {
  const datos = {
    id:"",
    nombre: "",
    categoria:"",
    talla:"",
    precio: "",
    cantidad: "",
    descripcion:"",
    image:"",
  };

  const urlImages = "http://localhost:4000/images/";

  const [saveDatos, setSaveDatos] = useState(datos);
  const [almacenarDatos, setAlmacenarDatos] = useState([]);

  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setSaveDatos({ ...saveDatos, [name]: value });
  };

  const GuardarDatos = async (e) => {
    e.preventDefault();
    const formu = document.getElementById("form-producto");
    const formData = new FormData(formu);
    //const data = Object.fromEntries(formData);
    await Axios.post("producto/guardarProducto", formData).then(() => {
      console.log("Registros guardados correctamente");
    });
    console.log();
    consultarInformacion();
    setSaveDatos(datos);
  };

  const consultarInformacion=async()=>{
    const consultar=await Axios.get("producto/consultarProducto");
    setAlmacenarDatos(consultar.data);
    //console.log(consultar.data);
  }

  const Eliminar = async(id) => {
    const eliminar= await Axios.delete(`producto/eliminarProducto/${id}`);
    console.log("Los datos se eliminaron correctamente: "+eliminar);
    consultarInformacion();
  };

  const buscarOne = async (id) => {
    const editar = await Axios.patch(`producto/oneProducto/${id}`);
    setSaveDatos(editar.data);
  };


  useEffect(()=>{
    consultarInformacion();
  },[]);


  const Editar = () => {
    alert("Se va a editar"); 
  };

  const listaProducto = almacenarDatos.map((producto, index) => {
    return (
      <tbody>
         <tr className="text-center">
          <th scope="row">{index + 1}</th>
          <td>{producto.nombre}</td>
          <td>$&nbsp;{producto.precio}.00</td>
          <td>&nbsp;{producto.cantidad}</td>
          <td>&nbsp;{producto.descripcion}</td>
          <td>
            <img
              src={urlImages + producto.filename}
              className="img-thumbnail"
              alt="..."
              style={{width:"100px"}}
            />
          </td>
          <td>
            <button
              className="btn btn-info"
              onClick={() => navigate(`/product/editar/${producto._id}`)}
            >
              <i className="bi bi-pencil"></i>
            </button>
          </td>

          <td>
            <button className="btn btn-danger" onClick={()=>Eliminar(producto._id)}>
              <i className="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    );
  });

  return (
    <div>
      <div className="section mx-auto p-2" style={{ width: "200px" }}>
        <button
          type="button "
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <i className="bi bi-arrow-bar-up"></i> Agregar producto...
        </button>
      </div>
      <table className="table m-3">
      
        <thead>
          <tr className="text-center">
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
            <th scope="col">descripcion</th>
            <th scope="col">imagen</th>
            <th scope="col">Editar</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>

        {listaProducto}
      </table>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Registro de productos
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form
                className="row g-3"
                onSubmit={GuardarDatos}
                id="form-producto"
                encType="multipart/form-data"
              >
                <div className="col-md-12">
                  <label for="validationDefault01" className="form-label">
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
                  <label for="validationDefault01" className="form-label">
                    Categoria
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationDefault01"
                    placeholder="Categoria"
                    name="categoria"
                    value={saveDatos.categoria}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label for="validationDefault01" className="form-label">
                    Talla
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationDefault01"
                    placeholder="Introduzca la Talla"
                    name="talla"
                    value={saveDatos.talla}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label for="validationDefault02" className="form-label">
                    Precio
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationDefault02"
                    placeholder="Precio del producto"
                    name="precio"
                    value={saveDatos.precio}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label for="validationDefault02" className="form-label">
                    Cantidad
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationDefault02"
                    placeholder="Cantidad de productos"
                    name="cantidad"
                    value={saveDatos.cantidad}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label 
                  for="exampleFormControlTextarea1" 
                  className="form-label">Descripción</label>
                  <textarea 
                  className="form-control" 
                  id="exampleFormControlTextarea1" 
                  name="descripcion"
                  value={saveDatos.descripcion}
                  onChange={onChange}
                  rows="3">
                  </textarea>
                </div>
                <div className="input-group">
                  <input type="file" 
                  className="form-control" 
                  id="inputGroupFile04" 
                  aria-describedby="inputGroupFileAddon04" 
                  aria-label="Upload"
                  name="image"
                  value={saveDatos.image}
                  onChange={onChange}/>
                </div>
                <div className="col-12">
                  <button className="btn btn-primary" type="submit">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableProductos;