import fullLogo from '../logo-promolider.png';
import Navbar from "./Navbar";
import { useParams } from 'react-router-dom';
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";

export default function NFTPage(props) {

    const [data, updateData] = useState({});
    const [dataFetched, updateDataFetched] = useState(false);
    const [message, updateMessage] = useState("");
    const [currAddress, updateCurrAddress] = useState("0x");

    async function getNFTData(tokenId) {
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        //Pull the deployed contract instance
        let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
        //create an NFT Token
        const tokenURI = await contract.tokenURI(tokenId);
        const listedToken = await contract.getListedTokenForId(tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;
        console.log(listedToken);

        let item = {
            price: meta.price,
            tokenId: tokenId,
            seller: listedToken.seller,
            owner: listedToken.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
        console.log(item);
        updateData(item);
        updateDataFetched(true);
        console.log("address", addr)
        updateCurrAddress(addr);
    }

    async function buyNFT(tokenId) {
        try {
            const ethers = require("ethers");
            //After adding your Hardhat network to your metamask, this code will get providers and signers
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            //Pull the deployed contract instance
            let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer);
            const salePrice = ethers.utils.parseUnits(data.price, 'ether')
            updateMessage("Buying the NFT... Please Wait (Upto 5 mins)")
            //run the executeSale function
            let transaction = await contract.executeSale(tokenId, { value: salePrice });
            await transaction.wait();

            alert('You successfully bought the NFT!');
            updateMessage("");
        }
        catch (e) {
            alert("Upload Error" + e)
        }
    }

    const params = useParams();
    const tokenId = params.tokenId;
    if (!dataFetched)
        getNFTData(tokenId);

    return (
        <div id="home">
            <Navbar></Navbar>
            <section id="about" className="spacer10">
                <div className="container">
                    <h1 className="bold size6 ta-center titlegreen">Producto</h1>
                    <p className="spacebottom3 halfwhite size2 ta-center">
                        Adquiere tu NFT con<br />nosotros.
                    </p>
                    <div className="row ai-center jc-between flexcol-s ">
                        <div className="col6 col12-s ta-center-s">
                            <h3 className="size4 bold titlegreen">Yellow Red</h3>
                            <p className="size3 spacetop1 spacebottom3 halfwhite">NFT promolider, insertar descripción aquí, insertar descripción aquí, 
                            insertar descripción aquí, insertar descripción aquí.
                            </p>
                            <h3 className="size4 bold titlegreen">PRECIO</h3>
                            <p className="size3 spacetop1 spacebottom3 halfwhite">0.005 ETH</p>
                            <div className="col6 col5-md col7-s swiper-slide">
                                <div className="card">
                                    <div>
                                        {currAddress === data.owner || currAddress !== data.seller ?
                                            <button className="enableEthereumButton bid size2 ta-center">Buy this NFT</button>
                                            : <div className="text-emerald-700">You are the owner of this NFT</div>
                                        }
                                        <div className="text-green text-center mt-3">{message}</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col5 col10-s spacebottom2-s">
                            <img src="/assets/img/collection1.png" className="img-responsive" alt="" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="featured spacer10" id="featured">
                <div className="container">
                    <h1 className="bold size5 ta-center titlegreen">Obras destacadas</h1>
                    <p className="spacebottom3 halfwhite size2 ta-center">
                        Top 5 NFT más vistos de la pagina<br />principal.
                    </p>
                    <div className="swiper card-slider row">
                        <div className="swiper-wrapper">
                            <div className="col4 col5-md col7-s swiper-slide">
                                <div className="card bg-white10">
                                    <img src="/assets/img/collection4.png" className="img-responsive" alt="" />
                                    <div className="row jc-between spacetop2">
                                        <div>
                                            <p className="size2 halfwhite">
                                                @Johny
                                            </p>
                                            <h5 className="size2 bold">Yellow Red</h5>
                                        </div>
                                        <div>
                                            <p className="current halfwhite">ETHEREUM</p>
                                            <h5 className="size2 bold">0.005ETH</h5>
                                        </div>
                                    </div>
                                    <a className="bid size2 ta-center">
                                        Adquirir NFT
                                    </a>
                                </div>
                            </div>
                            <div className="col4 col5-md col7-s swiper-slide">
                                <div className="card bg-white10">
                                    <img src="/assets/img/collection5.png" className="img-responsive" alt="" />
                                    <div className="row jc-between spacetop2">
                                        <div>
                                            <p className="size2 halfwhite">
                                                @Johny
                                            </p>
                                            <h5 className="size2 bold">Yellow Red</h5>
                                        </div>
                                        <div>
                                            <p className="current halfwhite">ETHEREUM</p>
                                            <h5 className="size2 bold">0.005ETH</h5>
                                        </div>
                                    </div>
                                    <a className="bid size2 ta-center">
                                        Adquirir NFT
                                    </a>
                                </div>
                            </div>
                            <div className="col4 col5-md col7-s swiper-slide">
                                <div className="card bg-white10">
                                    <img src="/assets/img/collection6.png" className="img-responsive" alt="" />
                                    <div className="row jc-between spacetop2">
                                        <div>
                                            <p className="size2 halfwhite">
                                                @Angel
                                            </p>
                                            <h5 className="size2 bold">An Angel</h5>
                                        </div>
                                        <div>
                                            <p className="current halfwhite">ETHEREUM</p>
                                            <h5 className="size2 bold">0.005ETH</h5>
                                        </div>
                                    </div>
                                    <a className="bid size2 ta-center">
                                        Adquirir NFT
                                    </a>
                                </div>
                            </div>
                            <div className="col4 col5-md col7-s swiper-slide">
                                <div className="card bg-white10">
                                    <img src="/assets/img/collection1.png" className="img-responsive" alt="" />
                                    <div className="row jc-between spacetop2">
                                        <div>
                                            <p className="size2 halfwhite">
                                                @Angel
                                            </p>
                                            <h5 className="size2 bold">An Angel</h5>
                                        </div>
                                        <div>
                                            <p className="current halfwhite">ETHEREUM</p>
                                            <h5 className="size2 bold">0.005ETH</h5>
                                        </div>
                                    </div>
                                    <a className="bid size2 ta-center">
                                        Adquirir NFT
                                    </a>
                                </div>
                            </div>
                            <div className="col4 col5-md col7-s swiper-slide">
                                <div className="card bg-white10">
                                    <img src="/assets/img/collection7.png" className="img-responsive" alt="" />
                                    <div className="row jc-between spacetop2">
                                        <div>
                                            <p className="size2 halfwhite">
                                                @Angel
                                            </p>
                                            <h5 className="size2 bold">An Angel</h5>
                                        </div>
                                        <div>
                                            <p className="current halfwhite">ETHEREUM</p>
                                            <h5 className="size2 bold">0.005ETH</h5>
                                        </div>
                                    </div>
                                    <a className="bid size2 ta-center">
                                        Adquirir NFT
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="spacer5">
                <div className="container row jc-between flexcol-s ta-center-s">
                    <div className="row flexcol spacebottom3-s">
                        <a href="#" className="logo bold white"><img className="logo_principal" src={fullLogo} /></a>
                        <p className="size2 halfwhite spacetop2">El mejor sitio web del mercado NFT en
                            <br />el mundo y siente tu experiencia en
                            <br />vender o comprar nuestro trabajo</p>
                    </div>
                    <div className="row flexcol spacebottom3-s">
                        <a href="#about" className="bold size2 white">Sobre nosotros</a>
                        <a href="#" className="size2 halfwhite spacetop2">Productos</a>
                        <a href="#" className="size2 halfwhite spacetop2">Terminos y condiciones</a>
                        <a href="#" className="size2 halfwhite spacetop2">Preguntas frecuentes</a>
                    </div>
                    <div className="row flexcol spacebottom3-s">
                        <a href="#" className="bold size2 white">Compañía</a>
                        <a href="#" className="size2 halfwhite spacetop2">Nuestro equipo</a>
                        <a href="#" className="size2 halfwhite spacetop2">Asociate con nosotros</a>
                        <a href="#" className="size2 halfwhite spacetop2">Politica y privacidad</a>
                    </div>
                    <div className="row flexcol spacebottom3-s">
                        <h5 className="bold size2">Contacto</h5>
                        <a href="tel:+51 995668600" className="size2 halfwhite spacetop2">+51 995668600</a>
                        <a href="mailto:promoliderorg@gmail.com" target="_blank" className="size2 halfwhite spacetop2">promoliderorg@gmail.com</a>
                        <div className="row jc-between spacetop2 jc-evenly-s">
                            <a href="https://www.facebook.com/profile.php?id=100063926738412" className="fab fa-facebook size2 halfwhite spacetop2"></a>
                            <a href="https://www.linkedin.com/company/promol%C3%ADder/mycompany/" className="fab fa-linkedin size2 halfwhite spacetop2"></a>
                            <a href="https://www.instagram.com/promoliderorg/?igshid=YmMyMTA2M2Y%3D" className="fab fa-instagram size2 halfwhite spacetop2"></a>
                        </div>
                    </div>
                </div>
                <p className="size2 halfwhite spacetop10 ta-center">©COPYRIGHT 2022. PROMOLIDER NFT. TODOS LOS DERECHOS RESERVADOS.</p>
            </footer>
        </div >
    );
}