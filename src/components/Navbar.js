import fullLogo from '../logo-promolider.png';
import {
  Link,
} from "react-router-dom";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

function Navbar() {

  const [connected, toggleConnect] = useState(false);
  const location = useLocation();
  const [currAddress, updateAddress] = useState('0x');

  async function getAddress() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    updateAddress(addr);
  }

  function updateButton() {
    const ethereumButton = document.querySelector('.enableEthereumButton');
    ethereumButton.classList.remove("hover:bg-blue-70");
    ethereumButton.classList.remove("bg-blue-500");
    ethereumButton.classList.add("hover:bg-green-70");
    ethereumButton.classList.add("bg-green-500");
  }

  async function connectWebsite() {

    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId !== '0x5') {
      //alert('Incorrect network! Switch your metamask network to Rinkeby');
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x5' }],
      })
    }
    await window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(() => {
        updateButton();
        console.log("here");
        getAddress();
        window.location.replace(location.pathname)
      });
  }

  useEffect(() => {
    let val = window.ethereum.isConnected();
    if (val) {
      console.log("here");
      getAddress();
      toggleConnect(val);
      updateButton();
    }

    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.replace(location.pathname)
    })
  });

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
          {location.pathname === "/profile" ?
            <a href="#profile">
              <Link to="/profile">Perfil</Link>
            </a>
            :
            <a href="#profile">
              <Link to="/profile">Perfil</Link>
            </a>
          }
          <button className="enableEthereumButton btn bg-green wallet" onClick={connectWebsite}>{connected ? "Conectar billetera" : "Billetera conectada"}</button>
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