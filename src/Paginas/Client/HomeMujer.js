import React from 'react';
import {dataMujer} from'../../DB/data'

//import { Link } from 'react-router-dom';

function HomeMujer() {
    return (
        <section style={{ backgroundColor: '#eee' }}>
          <div className="container py-5">
            <div className="row">
              {dataMujer.map((data, index) => (
                <div className="col-md-6 col-lg-4 mb-4 mb-md-0" key={index}>
                  <div className="card">
                    <div className="d-flex justify-content-between p-3">
                      <p className="lead mb-0">Oferta del Dia</p>
                      <div className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong" style={{ width: '35px', height: '35px' }}>
                        <p className="text-white mb-0 small">x{data.cantidad}</p>
                      </div>
                    </div>
                    <img src={data.image} className="card-img-top" alt="Product" />
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <p className="small"><a href="#!" className="text-muted">Productos</a></p>
                        <p className="small text-danger"><s>${data.precio + 100}</s></p>
                      </div>
    
                      <div className="d-flex justify-content-between mb-3">
                        <h5 className="mb-0">{data.nombre}</h5>
                        <h5 className="text-dark mb-0">${data.precio}</h5>
                      </div>
    
                      <div className="d-flex justify-content-between mb-2">
                        <p className="text-muted mb-0">Existencia: <span className="fw-bold">{data.cantidad}</span></p>
                        <div className="ms-auto text-warning">
                          <i className="bi bi-star"></i>
                          <i className="bi bi-star"></i>
                          <i className="bi bi-star"></i>
                          <i className="bi bi-star"></i>
                          <i className="bi bi-star"></i>
                          <p className="text-end">
                          
                          </p>
                        </div>

                        
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }
    
    export default HomeMujer;