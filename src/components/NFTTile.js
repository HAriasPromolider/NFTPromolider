import axie from "../tile.jpeg";
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";

function NFTTile(data) {
    const newTo = {
        pathname: "/nftPage/" + data.data.tokenId
    }
    return (
        <div className="col4 card collect bg-white10 col5-md col6-s" data-item="pattern">
            <img src={data.data.image} className="img-responsive" alt="" />
            <div className="row jc-between spacetop2">
                <div>
                    <p className="size2 halfwhite">
                        @Promolider
                    </p>
                    <h5 className="size2 bold">{data.data.name}</h5>
                </div>
                <div>
                    <p className="current halfwhite">ETHEREUM</p>
                    <h5 className="size2 bold">{data.data.price}ETH</h5>
                </div>
            </div>
            <Link to={newTo} className="bid size2 ta-center">
                Visualizar NFT
            </Link>
        </div>
    )
}

export default NFTTile;
