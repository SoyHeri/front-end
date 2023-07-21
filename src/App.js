import { BrowserRouter } from "react-router-dom";
import Rutas from "./Rutas/Rutas";


// Toaster para mensajes temporales 
import { Toaster } from "react-hot-toast";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    
      <BrowserRouter>
        <div>
          <Rutas />
          <Toaster />
          <ToastContainer />         
        </div>
      </BrowserRouter>
    
  );
}

export default App;
