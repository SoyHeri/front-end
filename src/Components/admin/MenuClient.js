import {Link} from "react-router-dom";

function MenuClient() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="img/logo1.png" alt="..." width="170" height="27"/>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/dama">
                DAMA
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/caballero">
                CABALLERO
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/niño">
                NIÑO
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/niña">
                NIÑA
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/product">
                PRODUCTO
              </Link>
            </li>
            
            
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
export default MenuClient;