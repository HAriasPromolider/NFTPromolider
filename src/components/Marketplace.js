import fullLogo from '../logo-promolider.png';
import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";

export default function Marketplace() {
    const sampleData = [
        {
            "name": "NFT#1",
            "description": "Alchemy's First NFT",
            "website": "http://axieinfinity.io",
            "image": "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
            "price": "0.03ETH",
            "currentlySelling": "True",
            "address": "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
        },
        {
            "name": "NFT#2",
            "description": "Alchemy's Second NFT",
            "website": "http://axieinfinity.io",
            "image": "https://gateway.pinata.cloud/ipfs/QmdhoL9K8my2vi3fej97foiqGmJ389SMs55oC5EdkrxF2M",
            "price": "0.03ETH",
            "currentlySelling": "True",
            "address": "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
        },
        {
            "name": "NFT#3",
            "description": "Alchemy's Third NFT",
            "website": "http://axieinfinity.io",
            "image": "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
            "price": "0.03ETH",
            "currentlySelling": "True",
            "address": "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
        },
    ];
    const [data, updateData] = useState(sampleData);
    const [dataFetched, updateFetched] = useState(false);

    async function getAllNFTs() {
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        //Pull the deployed contract instance
        let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
        //create an NFT Token
        let transaction = await contract.getAllNFTs()

        //Fetch all the details of every NFT from the contract and display
        const items = await Promise.all(transaction.map(async i => {
            const tokenURI = await contract.tokenURI(i.tokenId);
            let meta = await axios.get(tokenURI);
            meta = meta.data;

            let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.image,
                name: meta.name,
                description: meta.description,
            }
            return item;
        }))

        updateFetched(true);
        updateData(items);
    }

    if (!dataFetched)
        getAllNFTs();

    return (
        <div id="home">
            <Navbar></Navbar>
            <section className="spacetop20 spacebottom10">
                <div className="container">
                    <div className="row jc-between ai-center col-reverse-s">
                        <div className="col5 col6-md col12-s ta-center-s">
                            <h1 className="size6 bold spacebottom1 titlegreen">
                                Conviértete en socio fundador de Promolider y obtén tu NFT
                            </h1>
                            <p className="size2 spacebottom3 halfwhite">"Estamos contentos de ser liderados por ti y por tu gran visión de negocios"
                                <br /><i>~Giovany Pernia. CEO Promolider</i>
                            </p>

                            <div className="row col8 col9-md jc-between spacebottom4 jc-evenly-s col12-s">
                                <a href="#collections" className="btn bg-green size2 white ">Explorar ahora</a>
                                <a href="#about" className="btn bg-white10 size2 white ">Nuestros socios</a>
                            </div>

                        </div>
                        <div className="col6 col13-s spacebottom3-s">
                            <img src="assets/img/PromoliderImage.gif" alt="" className="img-responsive float" />
                        </div>
                    </div>
                </div>
            </section>

            <section id="about" className="spacer10">
                <div className="container">
                    <h1 className="bold size6 ta-center titlegreen">Sobre nosotros</h1>
                    <p className="spacebottom3 halfwhite size2 ta-center">
                        Conoce un poco más sobre<br />nosotros.
                    </p>
                    <div className="row ai-center jc-between flexcol-s spacer3">
                        <div className="col6 col12-s ta-center-s">
                            <h3 className="size5 bold titlegreen">Promolider NFT</h3>
                            <p className="size3 spacetop1 spacebottom3 halfwhite">Promolider lanza al mercado sus propios
                                NFT con la garantía del 10% de la utilidad
                                de la empresa, siendo estos de origen único
                                no repetible y coleccionable, que brinda la
                                oportunidad al poseedor de revalorizar su
                                inversión de forma exponencial, convirtiéndose
                                en uno de los 100 socio fundadores.
                            </p>
                        </div>
                        <div className="col5 col10-s spacebottom2-s">
                            <img src="/assets/img/nft png.gif" className="nft-logo" alt="" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="collections" id="collections">
                <div className="container">
                    <h1 className="bold size6 ta-center titlegreen">Colecciones</h1>
                    <p className="spacebottom3 halfwhite size2 ta-center">
                        Visualiza nuestra gran colleción de NFT<br />que tenemos para ti.
                    </p>
                    <div className="row spacebottom3 filter-buttons">
                        <div className="col3 filter col6-xs spacebottom1-xs" data-filter="all">Todo</div>
                        <div className="col3 filter col6-xs spacebottom1-xs" data-filter="art">Arte</div>
                        <div className="col3 filter col6-xs" data-filter="photograpy">Fotografia</div>
                        <div className="col3 filter col6-xs" data-filter="pattern">Patrón</div>
                    </div>
                    <div className="row box-card jc-evenly-md">
                        <div class="col4 card collect bg-white10 col5-md col6-s" data-item="art">
                            <img src="assets/img/collection1.png" class="img-responsive" alt="" />
                            <div class="row jc-between spacetop2">
                                <div>
                                    <p class="size2 halfwhite">
                                        @Johny
                                    </p>
                                    <h5 class="size2 bold">Yellow Red</h5>
                                </div>
                                <div>
                                    <p class="current halfwhite">ETHEREUM</p>
                                    <h5 class="size2 bold">0.005ETH</h5>
                                </div>
                            </div>
                            <a href="nftpage/1  " class="bid size2 ta-center">
                                Adquirir NFT
                            </a>
                        </div>
                        <div class="col4 card collect bg-white10 col5-md col6-s" data-item="photograpy">
                            <img src="assets/img/collection2.png" class="img-responsive" alt="" />
                            <div class="row jc-between spacetop2">
                                <div>
                                    <p class="size2 halfwhite">
                                        @Johny
                                    </p>
                                    <h5 class="size2 bold">Yellow Red</h5>
                                </div>
                                <div>
                                    <p class="current halfwhite">ETHEREUM</p>
                                    <h5 class="size2 bold">0.005ETH</h5>
                                </div>
                            </div>
                            <a class="bid size2 ta-center">
                                Adquirir NFT
                            </a>
                        </div>
                        <div class="col4 card collect bg-white10 col5-md col6-s" data-item="pattern">
                            <img src="assets/img/collection3.png" class="img-responsive" alt="" />
                            <div class="row jc-between spacetop2">
                                <div>
                                    <p class="size2 halfwhite">
                                        @Johny
                                    </p>
                                    <h5 class="size2 bold">Yellow Red</h5>
                                </div>
                                <div>
                                    <p class="current halfwhite">ETHEREUM</p>
                                    <h5 class="size2 bold">0.005ETH</h5>
                                </div>
                            </div>
                            <a class="bid size2 ta-center">
                                Adquirir NFT
                            </a>
                        </div>

                        <div class="col4 card collect bg-white10 col5-md col6-s" data-item="art">
                            <img src="assets/img/collection4.png" class="img-responsive" alt="" />
                            <div class="row jc-between spacetop2">
                                <div>
                                    <p class="size2 halfwhite">
                                        @Johny
                                    </p>
                                    <h5 class="size2 bold">Yellow Red</h5>
                                </div>
                                <div>
                                    <p class="current halfwhite">ETHEREUM</p>
                                    <h5 class="size2 bold">0.005ETH</h5>
                                </div>
                            </div>
                            <a class="bid size2 ta-center">
                                Adquirir NFT
                            </a>
                        </div>
                        <div class="col4 card collect bg-white10 col5-md col6-s" data-item="photograpy">
                            <img src="assets/img/collection5.png" class="img-responsive" alt="" />
                            <div class="row jc-between spacetop2">
                                <div>
                                    <p class="size2 halfwhite">
                                        @Johny
                                    </p>
                                    <h5 class="size2 bold">Yellow Red</h5>
                                </div>
                                <div>
                                    <p class="current halfwhite">ETHEREUM</p>
                                    <h5 class="size2 bold">0.005ETH</h5>
                                </div>
                            </div>
                            <a class="bid size2 ta-center">
                                Adquirir NFT
                            </a>
                        </div>
                        <div class="col4 card collect bg-white10 col5-md col6-s" data-item="pattern">
                            <img src="assets/img/collection6.png" class="img-responsive" alt="" />
                            <div class="row jc-between spacetop2">
                                <div>
                                    <p class="size2 halfwhite">
                                        @Angel
                                    </p>
                                    <h5 class="size2 bold">An Angel</h5>
                                </div>
                                <div>
                                    <p class="current halfwhite">ETHEREUM</p>
                                    <h5 class="size2 bold">0.005ETH</h5>
                                </div>
                            </div>
                            <a class="bid size2 ta-center">
                                Adquirir NFT
                            </a>
                        </div>

                        <div class="col4 card collect bg-white10 col5-md col6-s" data-item="art">
                            <img src="assets/img/collection7.png" class="img-responsive" alt="" />
                            <div class="row jc-between spacetop2">
                                <div>
                                    <p class="size2 halfwhite">
                                        @Johny
                                    </p>
                                    <h5 class="size2 bold">Yellow Red</h5>
                                </div>
                                <div>
                                    <p class="current halfwhite">ETHEREUM</p>
                                    <h5 class="size2 bold">0.005ETH</h5>
                                </div>
                            </div>
                            <a class="bid size2 ta-center">
                                Adquirir NFT
                            </a>
                        </div>
                        <div class="col4 card collect bg-white10 col5-md col6-s" data-item="photograpy">
                            <img src="assets/img/collection8.png" class="img-responsive" alt="" />
                            <div class="row jc-between spacetop2">
                                <div>
                                    <p class="size2 halfwhite">
                                        @Johny
                                    </p>
                                    <h5 class="size2 bold">Yellow Red</h5>
                                </div>
                                <div>
                                    <p class="current halfwhite">ETHEREUM</p>
                                    <h5 class="size2 bold">0.005ETH</h5>
                                </div>
                            </div>
                            <a class="bid size2 ta-center">
                                Adquirir NFT
                            </a>
                        </div>
                        <div class="col4 card collect bg-white10 col5-md col6-s" data-item="pattern">
                            <img src="assets/img/collection9.png" class="img-responsive" alt="" />
                            <div class="row jc-between spacetop2">
                                <div>
                                    <p class="size2 halfwhite">
                                        @Johny
                                    </p>
                                    <h5 class="size2 bold">Yellow Red</h5>
                                </div>
                                <div>
                                    <p class="current halfwhite">ETHEREUM</p>
                                    <h5 class="size2 bold">0.005ETH</h5>
                                </div>
                            </div>
                            <a class="bid size2 ta-center">
                                Adquirir NFT
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="featured spacer10" id="featured">
                <div className="container">
                    <h1 className="bold size6 ta-center titlegreen">Obras destacadas</h1>
                    <p className="spacebottom3 halfwhite size2 ta-center">
                        Top 5 NFT más vistos de la pagina<br />principal.
                    </p>
                    <div className="swiper card-slider row">
                        <div className="swiper-wrapper">
                            <div className="col4 col5-md col7-s swiper-slide">
                                <div className="card bg-white10">
                                    <img src="assets/img/collection4.png" className="img-responsive" alt="" />
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
                                    <img src="assets/img/collection5.png" className="img-responsive" alt="" />
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
                                    <img src="assets/img/collection6.png" className="img-responsive" alt="" />
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
                                    <img src="assets/img/collection1.png" className="img-responsive" alt="" />
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
                                    <img src="assets/img/collection7.png" className="img-responsive" alt="" />
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

            <section className="creator spacer10">
                <div className="container">
                    <h1 className="bold size6 ta-center titlegreen">Nuestros socios</h1>
                    <p className="spacebottom3 halfwhite size2 ta-center">
                        Personas que se convirtieron en nuestros socios<br />al adquirir su NFT.
                    </p>
                    <div className="swiper row creator-slider">
                        <div className="swiper-wrapper">
                            <div className="col4 col5-md col7-s swiper-slide">
                                <div className="card-creator bg-white10 ta-center">
                                    <img src="assets/img/creator1.png" className="img-responsive" alt="" />
                                    <img src="assets/img/photo1.png" className="photo nft-logo" alt="" />
                                    <h5 className="spacer1 size2 bold titlegreen">Maria Perez</h5>
                                    <p className="spacebottom2 halfwhite desc">Descripción de la ocupación
                                        <br />de la persona</p>
                                    <button className="follow ta-center bg-green white">+ Seguir</button>
                                </div>
                            </div>
                            <div className="col4 col5-md col7-s swiper-slide">
                                <div className="card-creator bg-white10 ta-center">
                                    <img src="assets/img/creator2.png" className="img-responsive" alt="" />
                                    <img src="assets/img/photo2.png" className="photo nft-logo" alt="" />
                                    <h5 className="spacer1 size2 bold titlegreen">Alejando Bustamante</h5>
                                    <p className="spacebottom2 halfwhite desc">Descripción de la ocupación
                                        <br />de la persona</p>
                                    <button className="follow ta-center bg-green white">+ Seguir</button>
                                </div>
                            </div>
                            <div className="col4 col5-md col7-s swiper-slide">
                                <div className="card-creator bg-white10 ta-center">
                                    <img src="assets/img/creator3.png" className="img-responsive" alt="" />
                                    <img src="assets/img/photo3.png" className="photo nft-logo" alt="" />
                                    <h5 className="spacer1 size2 bold titlegreen">Diana Ramirez</h5>
                                    <p className="spacebottom2 halfwhite desc">Descripción de la ocupación
                                        <br />de la persona</p>
                                    <button className="follow ta-center bg-green white">+ Seguir</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            <section className="spacer10" id="faq">
                <div className="container">
                    <h1 className="bold size6 ta-center titlegreen">Preguntas frecuentes</h1>
                    <p className="spacebottom5 halfwhite size2 ta-center">
                        ¿Quieres preguntar algo?
                    </p>
                    <div className="row jc-between">
                        <div className="box-faq col6 col12-s">
                            <div className="box spacebottom5">
                                <div className="title row jc-between">
                                    <h3 className="size2 halfwhite">¿Que gano como socio fundador de Promolider?</h3>
                                    <i className="fas fa-angle-down size2 halfwhite"></i>
                                </div>
                                <p className="answer size2 spacetop1 ">Todo socio fundador de Promolider  estarás participando en la distribución del 10% de
                                    la utilidad anual de la empresa entre  los 100 poseedores de la edición limitada de los NFTS. </p>
                            </div>
                            <div className="box spacebottom5">
                                <div className="title row jc-between">
                                    <h3 className="size2 halfwhite">¿Porque poseer un NTF de Promolider?</h3>
                                    <i className="fas fa-angle-down size2 halfwhite"></i>
                                </div>
                                <p className="answer size2 spacetop1 ">El NFT es un contrato inteligente único, con garantía y respaldo financiero de Promlider.org</p>
                            </div>
                            <div className="box spacebottom5">
                                <div className="title row jc-between">
                                    <h3 className="size2 halfwhite">¿Qué tengo que hacer para ser socio de Promolider?</h3>
                                    <i className="fas fa-angle-down size2 halfwhite"></i>
                                </div>
                                <p className="answer size2 spacetop1 ">Debes adquirir una membresía de Promolider y comprar un  NFT</p>
                            </div>
                        </div>
                        <div className="box-faq col6 col12-s">
                            <div className="box spacebottom5">
                                <div className="title row jc-between">
                                    <h3 className="size2 halfwhite">¿Puedo vender o transferir mi NFT?</h3>
                                    <i className="fas fa-angle-down size2 halfwhite"></i>
                                </div>
                                <p className="answer size2 spacetop1 ">Si, puedes venderlo en el momento que tu desees</p>
                            </div>
                            <div className="box spacebottom5">
                                <div className="title row jc-between">
                                    <h3 className="size2 halfwhite">¿Por qué en el mercado se han vendido NFTS tan caros?</h3>
                                    <i className="fas fa-angle-down size2 halfwhite"></i>
                                </div>
                                <p className="answer size2 spacetop1 ">En efecto hay NFT que se han vendido en millones de Dólares,
                                    y esto se debe a que son piezas únicas que adquieren valor en el tiempo.</p>
                            </div>
                            <div className="box spacebottom5">
                                <div className="title row jc-between">
                                    <h3 className="size2 halfwhite">¿Pregunta 6?</h3>
                                    <i className="fas fa-angle-down size2 halfwhite"></i>
                                </div>
                                <p className="answer size2 spacetop1 ">Descripción detalla constetando a la pregunta
                                    que se puede visualizar en la parte superior</p>
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