import Navbar from "./Navbar";
import { useLocation, useParams } from 'react-router-dom';
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import NFTTile from "./NFTTile";

export default function Profile() {
    const [data, updateData] = useState([]);
    const [dataFetched, updateFetched] = useState(false);
    const [address, updateAddress] = useState("0x");
    const [totalPrice, updateTotalPrice] = useState("0");

    async function getNFTData(tokenId) {
        const ethers = require("ethers");
        let sumPrice = 0;
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)

        //create an NFT Token
        let transaction = await contract.getMyNFTs()

        /*
        * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
        * and creates an object of information that is to be displayed
        */

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
            sumPrice += Number(price);
            return item;
        }))

        updateData(items);
        updateFetched(true);
        updateAddress(addr);
        updateTotalPrice(sumPrice.toPrecision(3));
    }

    const params = useParams();
    const tokenId = params.tokenId;
    if (!dataFetched)
        getNFTData(tokenId);

    return (
        <div className="profileClass" style={{ "min-height": "100vh" }}>
            <Navbar></Navbar>
            <section className="creator spacer15">
                <div className="container">
                    <h1 className="bold size6 ta-center titlegreen">MIS NFTS</h1>
                    <div className="profileClass">
                        <div className="flex text-center flex-col mt-11 md:text-2xl text-white">
                            <div className="mb-5">
                                <h2 className="font-bold size3 titlegreen">Wallet Address</h2>
                                0x08461545A4654554DBSA464
                            </div>
                        </div>
                        <div className="flex flex-row text-center justify-center mt-10 md:text-2xl text-white">
                            <div>
                                <h2 className="font-bold size3 titlegreen">N° de NFTs</h2>
                                2
                            </div>
                            <div className="ml-20">
                                <h2 className="font-bold size3 titlegreen">Valor total</h2>
                                0.010 ETH
                            </div>
                        </div>
                        <div className="flex flex-col text-center items-center mt-11 text-white">
                            <div className="row box-card jc-evenly-md spacer5">
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
                                    <a href="producto.html" class="bid size2 ta-center">
                                        Visualizar mi NFT
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
                                        Visualizar mi NFT
                                    </a>
                                </div>
                            </div>
                            <div className="flex justify-center flex-wrap max-w-screen-xl">
                                {data.map((value, index) => {
                                    return <NFTTile data={value} key={index}></NFTTile>;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section >

        </div>
    )
};