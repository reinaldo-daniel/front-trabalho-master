import { AiFillHeart } from "react-icons/ai";

import "./Card.css";
import ImgDefault from "../images/imgDefault.jpg"

export default function CardCharacters({img, about, favorites, name}) {
    const abreviaSinopse = about 
        ? about.length > 120
            ? about.substring(0, 120) + "..." 
            : about
        : null;

    return (
        <div className="card">
            <img src={img || ImgDefault} alt={"imagem do personagem" + name} />
            <div className="info">
                <div className="cabecalho">
                    <h2 className="title">
                        {name}
                    </h2>
                </div>
                <div className="especify">
                    <p className="score"><AiFillHeart style={{color: 'red', marginRight: '5px'}}/> {favorites}</p>
                </div>
                <p className="sinopse">
                    {abreviaSinopse}
                </p>
            </div>
        </div>
    )
}