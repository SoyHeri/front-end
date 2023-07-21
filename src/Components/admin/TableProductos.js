import React, { useState, useEffect } from "react";
import { toast  } from "react-toastify";
import Axios from "../../service/Axios";
import { useNavigate } from "react-router-dom";
import "./Botones/Editar.css";
import "./Botones/Delete.css";
import "./TableProductos.css";



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
  const [show, setShow] = useState(false);
  const [carga, setCarga]=useState(0);
  const [loading, setLoading]=useState(false);
  const reiniciarBarraDeProgreso = () => {
    setCarga(0); // Suponiendo que `carga` es el estado que controla el progreso de la barra.
  };

  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setSaveDatos({ ...saveDatos, [name]: value });
  };

  const GuardarDatos = async (e) => {
    e.preventDefault();

  setLoading(true);
    const formu = document.getElementById("form-producto");
    const formData = new FormData(formu);
    //const data = Object.fromEntries(formData);

    await Axios.post("producto/guardarProducto", formData, {
      headers:{
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress(progressEvent){
        const {loaded,total}=progressEvent;
        const porcentaje=parseInt((loaded*100)/total);
        setCarga(porcentaje);
       // console.log(porcentaje);
      }
    }).then(() => {
      toast.success("Datos guardados correctamente!!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    });

    console.log();
    consultarInformacion();
    setSaveDatos(datos);
  };

  const consultarInformacion = async () => {
    const consultar = await Axios.get("producto/consultarProducto");
    setAlmacenarDatos(consultar.data);
    console.log(consultar);
  };

  const Eliminar = async(id) => {
    
    if (window.confirm("Realmente esta seguro de eliminar el producto? ")){
      const eliminar= await Axios.delete(`producto/eliminarProducto/${id}`);
      console.log("Los datos se eliminaron correctamente: "+eliminar);

      toast.success('Datos Eliminados PaPu!!!!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        
    }
    
    consultarInformacion();
  };

  const buscarOne = async (id) => {
    const editar = await Axios.patch(`producto/oneProducto/${id}`);
    setSaveDatos(editar.data);
  };


  useEffect(() => {
    consultarInformacion();
  }, []);


  const abrirModal = () => {

    setShow({...!show});
  };


  const listaProducto = almacenarDatos.map((producto, index) => {
    return (
      <tbody>
         <tr className="text-center">
          <th scope="row">{index + 1}</th>
          <td>
            <img
              src={urlImages + producto.image.filename}
              className="img-thumbnail"
              alt="..."
              style={{width:"50px"}}
            />
          </td>
          <td>{producto.nombre}</td>
          <td>$&nbsp;{producto.precio}.00</td>
          <td>&nbsp;{producto.cantidad}</td>
          <td>&nbsp;{producto.categoria}</td>
          <td>&nbsp;{producto.descripcion}</td>
          
          <td >
          <button className='Editar' onClick={() => navigate(`/product/editar/${producto._id}`)}>
            <svg className='Icon' viewBox='0 0 448 512'><path d='m410.3 231l11.3-11.3l-33.9-33.9l-62.1-62.1l-33.9-33.9l-11.3 
            11.3l-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 
            27-11.8 37.4-22.2l199.2-199.2l22.6-22.7zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9l-78.2 23l23-78.1c1.4-4.9 3.8-9.4 
            6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7l-14.4 14.5l-22.6 22.6l-11.4 11.3l33.9 33.9l62.1 62.1l33.9 
            33.9l11.3-11.3l22.6-22.6l14.5-14.5c25-25 25-65.5 0-90.5l-39.3-39.4c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 
            6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z'></path></svg>
        </button>
          </td>


          <td>
          <button className='button' onClick={()=>Eliminar(producto._id)}>
            <svg className='svgIcon' viewBox='0 0 448 512'><path d='M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64s14.3 32 32 32h384c17.7 0 
            32-14.3 32-32s-14.3-32-32-32h-96l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32l21.2 
            339c1.6 25.3 22.6 45 47.9 45h245.8c25.3 0 46.3-19.7 47.9-45L416 128z'></path></svg>
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
            <th scope="col">Imagen</th>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Categoría</th>
            <th scope="col">Descripcion</th>           
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
                <select
                  className="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  name="categoria"
                  value={saveDatos.categoria}
                  onChange={onChange}
                >
                  <option value="" disabled selected>Seleccione una Categoría</option>
                  <option value="Hombre">Hombre</option>
                  <option value="Mujer">Mujer</option>
                  <option value="Niño">Niño</option>
                  <option value="Niña">Niña</option>
                </select>

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
                {
                  loading && (
                  <div className="col-12">
                <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" style={{width:`${carga}%`}}></div>
                </div>
                </div>
              )
            }               
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableProductos;