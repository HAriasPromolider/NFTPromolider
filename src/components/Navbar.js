import fullLogo from '../logo-promolider.png';
import {
  Link,
} from "react-router-dom";

function Navbar() {
  
  return (
    <header className="header bg-white10" id="navbar">
      <div className="container">
        <div className="logo spacetop1 bold white">
          <Link to="/">
            <img src={fullLogo} alt="" width={200} height={120} className="inline-block -mt-2" />
          </Link>
        </div>
        <div className="menu">
          <form action="" className="search-form">
            <label htmlFor="search-box" className="fas fa-search"></label>
            <input type="search" id="search-box" placeholder="Buscar items en las colecciones" />
          </form>
          <a href="#collections">Colecciones</a>
          <a href="#featured">Destacados</a>
            <a href="#profile">
              <Link to="/profile">Perfil</Link>
            </a>
          <button className="enableEthereumButton btn bg-green wallet">Conectar billetera</button>
        </div>
        <div className="fas fa-wallet" id="wallet"></div>
        <div className="fas fa-bars" id="bar"></div>

      </div>
      <div className="fas fa-wallet" id="wallet"></div>
      <div className="fas fa-bars" id="bar"></div>
    </header>

  );
}

export default Navbar;